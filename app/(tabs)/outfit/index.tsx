/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/(tabs)/outfit/index.tsx
 * 📝 功能简介：搭配列表页（大脑），负责组装所有搭配 UI 组件
 * ------------------------------------------------------------------
 */

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OutfitScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-2 pb-3">
        <Text className="text-2xl font-bold text-gray-900">我的搭配</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">搭配模块开发中...</Text>
      </View>
    </SafeAreaView>
  );
}
