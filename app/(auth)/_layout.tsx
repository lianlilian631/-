/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/(auth)/_layout.tsx
 * 📝 功能简介：登录/注册页面组的布局容器
 * ------------------------------------------------------------------
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
