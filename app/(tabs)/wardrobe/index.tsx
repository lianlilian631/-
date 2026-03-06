/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/(tabs)/wardrobe/index.tsx
 * 📝 功能简介：衣橱列表页（大脑），负责组装所有衣橱 UI 组件
 * ------------------------------------------------------------------
 */

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WardrobeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-2 pb-3">
        <Text className="text-2xl font-bold text-gray-900">我的衣橱</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">衣橱模块开发中...</Text>
      </View>
    </SafeAreaView>
  );
}
