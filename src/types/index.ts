/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/types/index.ts
 * 📝 功能简介：整个 App 的数据类型定义中心，所有 Interface 和枚举都在这里
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 User / ClothingItem / Outfit / WearLog / OutfitInspiration
 *    - 作用：定义数据库表对应的数据结构
 *    - 关键词：接口, 数据结构, 数据库
 *
 * 2. 🟢 枚举类型（ClothingCategory / Color / TempRange 等）
 *    - 作用：框定各字段的合法值，防止乱填
 *    - 关键词：枚举, 品类, 颜色, 温度
 * ------------------------------------------------------------------
 */

// ─── 用户 ──────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  real_name: string | null;
  phone_number: string | null;
  is_verified: boolean;
  created_at: string;
}

// ─── 单品 ──────────────────────────────────────────────────────────
export interface ClothingItem {
  id: string;
  user_id: string;
  image_url: string;
  bg_removed_url: string | null;
  brand: string | null;
  price: number | null;
  category: ClothingCategory;
  sub_category: SubCategoryValue | null;
  is_outerwear: boolean;
  colors: Color[];
  material: string | null;
  wear_count: number;
  last_worn_at: string | null;
  is_archived: boolean;
  created_at: string;
}

// ─── 搭配 ──────────────────────────────────────────────────────────
export interface Outfit {
  id: string;
  user_id: string;
  clothing_item_ids: string[];
  collage_image_url: string | null;
  photo_image_url: string | null;
  photo_bg_removed_url: string | null;
  content_status: OutfitContentStatus;
  is_photo_processing: boolean;
  mode: OutfitMode;
  occasions: string[];
  weather_temp_range: TempRange | null;
  notes: string | null;
  is_archived: boolean;
  created_at: string;
}

// ─── 穿搭日志 ──────────────────────────────────────────────────────
export interface WearLog {
  id: string;
  user_id: string;
  outfit_id: string;
  worn_date: string;
  outfit_image_url: string | null;
  weather_snapshot: string | null;
  created_at: string;
}

// ─── AI 搭配灵感 ────────────────────────────────────────────────────
export interface OutfitInspiration {
  id: string;
  user_id: string;
  top_item_id: string;
  bottom_item_id: string;
  composed_image_url: string;
}

// ─── 枚举：一级品类 ────────────────────────────────────────────────
export type ClothingCategory =
  | '上衣' | '下装' | '连身' | '外套' | '鞋靴' | '帽子' | '配饰';

// ─── 枚举：二级分类 ────────────────────────────────────────────────
export type SleeveLength = '无袖' | '短袖' | '长袖';
export type PantsLength = '短裤' | '长裤';
export type ShoeHeight = '高帮' | '中帮' | '低帮';
export type AccessoryType = '发饰' | '项链' | '耳环' | '手链' | '腰带';
export type SubCategoryValue = SleeveLength | PantsLength | ShoeHeight | AccessoryType;
export type SubCategoryLabel = '袖长' | '裤长' | '鞋帮' | '类型';

// ─── 枚举：颜色（11 个固定色卡）──────────────────────────────────
export type Color =
  | 'white' | 'black' | 'gray' | 'beige' | 'brown'
  | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'multicolor';

// ─── 枚举：场合预设 ───────────────────────────────────────────────
export type OccasionPreset =
  | '通勤上班' | '约会' | '周末休闲' | '运动'
  | '面试' | '正式场合' | '派对' | '其他';

// ─── 枚举：温度区间 ───────────────────────────────────────────────
export type TempRange = '<10°' | '10-20°' | '20-28°' | '>28°';

// ─── 枚举：排序方式 ───────────────────────────────────────────────
export type SortOption = '最近添加' | '穿着次数' | '购入价格';

// ─── 枚举：详情页 Tab ─────────────────────────────────────────────
export type DetailTab = 'detail' | 'inspiration';

// ─── 枚举：搭配创建模式 ───────────────────────────────────────────
export type OutfitMode = 'collage' | 'photo';

// ─── 枚举：搭配内容状态 ───────────────────────────────────────────
export type OutfitContentStatus = 'empty' | 'collage_only' | 'photo_only' | 'both';
