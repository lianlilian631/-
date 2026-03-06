/**
 * ------------------------------------------------------------------
 * 📂 文件路径：src/features/auth/components/AuthForm.tsx
 * 📝 功能简介：登录/注册共用的表单 UI 组件
 *
 * 🛠️ 核心功能列表：
 *
 * 1. 🟢 AuthForm
 *    - 作用：展示邮箱输入框、密码输入框和提交按钮
 *    - 关键词：表单, 输入框, 登录, 注册
 * ------------------------------------------------------------------
 */

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (email: string, password: string) => void;
  onToggleMode: () => void;
  loading: boolean;
  error: string | null;
}

export function AuthForm({ mode, onSubmit, onToggleMode, loading, error }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) return;
    onSubmit(email.trim(), password);
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mb-2">
        {mode === 'login' ? '欢迎回来' : '创建账号'}
      </Text>
      <Text className="text-gray-500 mb-8">
        {mode === 'login' ? '登录你的胶囊衣橱' : '开始管理你的衣橱'}
      </Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
        placeholder="邮箱地址"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-2 text-gray-900 text-base"
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9ca3af"
      />

      {error && (
        <Text className="text-red-500 text-sm mb-4">{error}</Text>
      )}

      <TouchableOpacity
        className="bg-blue-500 rounded-xl py-4 items-center mt-4"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-base">
            {mode === 'login' ? '登录' : '注册'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-6 items-center" onPress={onToggleMode}>
        <Text className="text-gray-500 text-sm">
          {mode === 'login' ? '还没有账号？立即注册' : '已有账号？去登录'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
