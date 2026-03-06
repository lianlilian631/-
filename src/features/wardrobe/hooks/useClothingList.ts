/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/features/wardrobe/hooks/useClothingList.ts
 * 📝 功能简介：衣橱列表页的"大脑遥控器"，负责获取衣物数据并处理筛选/排序
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 useClothingList
 *    - 作用：拉取用户所有衣物，按品类/属性/颜色筛选，再按指定方式排序
 *    - 关键词：列表, 筛选, 排序, 衣物
 *
 * 2. 🟢 SUB_CATEGORY_MAP
 *    - 作用：品类→二级分类的映射表（如"上衣"→袖长选项）
 *    - 关键词：二级分类, 动态筛选, 品类映射
 *
 * 3. 🟢 CATEGORIES
 *    - 作用：品类列表常量，供筛选组件使用
 *    - 关键词：品类, 常量
 *
 * 4. 🟢 availableColors（动态色卡）
 *    - 作用：从当前品类下已有衣物中提取颜色，只显示库里有的色卡
 *    - 关键词：颜色, 动态, 色卡
 * ------------------------------------------------------------------
 */

import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import type {
  ClothingItem,
  ClothingCategory,
  SubCategoryValue,
  SubCategoryLabel,
  Color,
  SortOption,
} from '../../../types';

// ─── 二级分类的数据结构 ─────────────────────────────────────────
// label = 筛选栏显示的标题（如"袖长："）
// options = 这个品类下有哪些可选项
export interface SubCategoryConfig {
  label: SubCategoryLabel;
  options: SubCategoryValue[];
}

// ─── 品类 → 二级分类 映射表 ─────────────────────────────────────
// 对应交互图：选中"上衣"Tab 后，下方出现"袖长: 无袖 | 短袖 | 长袖"
// 注意："连身"、"外套"、"帽子" 没有二级分类，所以不在这里
export const SUB_CATEGORY_MAP: Partial<
  Record<ClothingCategory, SubCategoryConfig>
> = {
  '上衣': { label: '袖长', options: ['无袖', '短袖', '长袖'] },
  '下装': { label: '裤长', options: ['短裤', '长裤'] },
  '鞋靴': { label: '鞋帮', options: ['高帮', '中帮', '低帮'] },
  '配饰': { label: '类型', options: ['发饰', '项链', '耳环', '手链', '腰带'] },
};

// ─── 一级品类列表（交互图顶部 7 个 Tab）────────────────────────
export const CATEGORIES: ClothingCategory[] = [
  '上衣', '下装', '连身', '外套', '鞋靴', '帽子', '配饰',
];

// ─── 色卡的固定顺序（用来保证色卡显示顺序一致）─────────────────
const COLOR_ORDER: Color[] = [
  'white', 'black', 'gray', 'beige', 'brown',
  'red', 'yellow', 'green', 'blue', 'purple', 'multicolor',
];

// ─── 主 Hook：衣橱列表的全部逻辑都在这里 ────────────────────────
// 参数 userId：当前登录用户的 ID，用来只查"我的"衣物
export function useClothingList(userId: string | undefined) {

  // 【状态1】当前选中的一级品类，默认"上衣"
  // → 对应交互图顶部 Tab 栏的高亮状态
  const [selectedCategory, setCategory] = useState<ClothingCategory>('上衣');

  // 【状态2】当前选中的二级分类，默认 null（=全部）
  // → 对应交互图"袖长: 无袖 | 短袖 | 长袖"的选中状态
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue | null>(null);

  // 【状态3】当前选中的颜色，默认 null（=全部）
  // → 对应交互图"颜色:"那一行色卡圆点的选中状态
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // 【状态4】当前排序方式，默认"最近添加"
  // → 对应交互图右上角排序按钮
  const [sortBy, setSortBy] = useState<SortOption>('最近添加');

  // 【行为】切换一级品类时，自动清空二级分类
  // 原因：选了"上衣"的"短袖"后切到"下装"，"短袖"无意义，必须重置
  const handleCategoryChange = useCallback((cat: ClothingCategory) => {
    setCategory(cat);
    setSelectedSubCategory(null);
  }, []);

  // 【计算】根据当前品类，决定要不要显示二级分类栏
  // 如选"上衣" → 返回 {label:'袖长', options:['无袖','短袖','长袖']}
  // 如选"连身" → 返回 null（不显示二级分类栏）
  const subCategoryConfig = SUB_CATEGORY_MAP[selectedCategory] ?? null;

  // ─── 数据库查询：一次性拉取该用户所有未归档衣物 ──────────────
  // 只在 userId 有效时才查询（未登录不查）
  // 筛选和排序在客户端做，避免每次切 Tab 都请求数据库
  const { data: allItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ['clothing-list', userId],
    queryFn: async (): Promise<ClothingItem[]> => {
      if (!userId) return [];
      const { data, error: dbError } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('user_id', userId)
        .eq('is_archived', false);
      if (dbError) throw dbError;
      return data ?? [];
    },
    enabled: !!userId,
  });

  // ─── 动态色卡：只显示当前品类下衣物已有的颜色 ─────────────────
  // 例：你的"上衣"里只有黑/白/蓝三种颜色，色卡栏就只出现这3个圆点
  // 顺序按 COLOR_ORDER 固定排列，保持视觉一致
  const availableColors = useMemo(() => {
    const categoryItems = allItems.filter((i) => i.category === selectedCategory);
    const colorSet = new Set(categoryItems.flatMap((i) => i.colors));
    return COLOR_ORDER.filter((c) => colorSet.has(c));
  }, [allItems, selectedCategory]);

  // ─── 客户端三层筛选 + 排序 ────────────────────────────────────
  // 第1层：按一级品类过滤（必选，始终生效）
  // 第2层：按二级分类过滤（可选，选了才过滤）
  // 第3层：按颜色过滤（可选，选了才过滤）
  // 最后：按排序方式排列结果
  const filteredItems = useMemo(() => {
    let result = allItems.filter((i) => i.category === selectedCategory);

    if (selectedSubCategory) {
      result = result.filter((i) => i.sub_category === selectedSubCategory);
    }
    if (selectedColor) {
      result = result.filter((i) => i.colors.includes(selectedColor));
    }

    switch (sortBy) {
      case '穿着次数':  // 穿得多的排前面
        return [...result].sort((a, b) => b.wear_count - a.wear_count);
      case '购入价格':  // 贵的排前面
        return [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      default:          // 最近添加的排前面
        return [...result].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [allItems, selectedCategory, selectedSubCategory, selectedColor, sortBy]);

  // ─── 返回值：交给衣橱页面（Screen）使用 ───────────────────────
  return {
    items: filteredItems,       // 筛选+排序后的衣物列表 → 给 ClothingGrid 展示
    isLoading,                  // 是否正在加载 → 给页面显示 loading 状态
    error,                      // 是否出错 → 给页面显示错误提示
    refetch,                    // 手动刷新 → 下拉刷新时调用
    categories: CATEGORIES,     // 7 个品类 → 给 CategoryFilter 组件
    selectedCategory,           // 当前选中品类 → 给 CategoryFilter 高亮
    setSelectedCategory: handleCategoryChange, // 切换品类 → CategoryFilter 点击
    subCategoryConfig,          // 二级分类配置 → 给 PropertyFilter 组件
    selectedSubCategory,        // 当前选中二级分类 → 给 PropertyFilter 高亮
    setSelectedSubCategory,     // 切换二级分类 → PropertyFilter 点击
    availableColors,            // 动态色卡（只含库里有的颜色）→ 给 ColorFilter
    selectedColor,              // 当前选中颜色 → 给 ColorFilter 高亮
    setSelectedColor,           // 切换颜色 → ColorFilter 点击
    sortBy,                     // 当前排序方式 → 给 SortControl 组件
    setSortBy,                  // 切换排序 → SortControl 点击
  };
}
