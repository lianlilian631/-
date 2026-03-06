/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/(tabs)/_layout.tsx
 * 📝 功能简介：底部 Tab 导航栏配置，包含衣橱和搭配两个主入口
 * ------------------------------------------------------------------
 */

import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { LayoutGrid, Shirt } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: '衣橱',
          tabBarIcon: ({ color, size }) => (
            <LayoutGrid size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="outfit"
        options={{
          title: '搭配',
          tabBarIcon: ({ color, size }) => (
            <Shirt size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
