/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/index.tsx
 * 📝 功能简介：App 启动入口，负责跳转到正确的页面（登录或主界面）
 * ------------------------------------------------------------------
 */

import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
}
