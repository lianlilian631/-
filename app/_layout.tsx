/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/_layout.tsx
 * 📝 功能简介：整个 App 的根布局，所有页面的共同父容器
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 QueryClientProvider
 *    - 作用：为所有页面提供 React Query 数据请求能力
 *    - 关键词：数据请求, 缓存, React Query
 *
 * 2. 🟢 认证守卫
 *    - 作用：检测登录状态，未登录自动跳转到登录页
 *    - 关键词：登录, 跳转, 守卫
 * ------------------------------------------------------------------
 */

import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { useSession } from '../src/hooks/useSession';

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { session, loading } = useSession();

  useEffect(() => {
    if (loading) return;
    if (session) {
      router.replace('/(tabs)/wardrobe');
    } else {
      router.replace('/(auth)/login');
    }
  }, [session, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}
