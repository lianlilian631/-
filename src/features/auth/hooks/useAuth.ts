/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/features/auth/hooks/useAuth.ts
 * 📝 功能简介：处理登录、注册、登出的逻辑遥控器
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 signIn
 *    - 作用：用邮箱+密码登录账号
 *    - 关键词：登录, 邮箱, 密码
 *
 * 2. 🟢 signUp
 *    - 作用：用邮箱+密码注册新账号
 *    - 关键词：注册, 新用户
 *
 * 3. 🟢 signOut
 *    - 作用：退出登录，清除本地 session
 *    - 关键词：退出, 登出
 * ------------------------------------------------------------------
 */

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '退出失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, signOut, loading, error };
}
