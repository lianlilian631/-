/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/hooks/useSession.ts
 * 📝 功能简介：全局监听用户登录状态的遥控器
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 useSession
 *    - 作用：监听用户是否已登录，返回 session 和 loading 状态
 *    - 关键词：登录状态, session, 认证
 * ------------------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
}
