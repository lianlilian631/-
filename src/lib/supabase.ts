/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/lib/supabase.ts
 * 📝 功能简介：Supabase 客户端初始化，整个 App 的数据库连接入口
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 supabase（导出的客户端单例）
 *    - 作用：连接 Supabase 数据库，所有增删改查都通过它
 *    - 关键词：数据库, 连接, 单例
 *
 * 2. 🟢 AsyncStorage 持久化
 *    - 作用：用户登录状态保存到手机本地，关闭 App 后无需重新登录
 *    - 关键词：登录, 持久化, session
 * ------------------------------------------------------------------
 */

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
