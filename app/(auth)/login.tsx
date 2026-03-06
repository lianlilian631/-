/**
 * ------------------------------------------------------------------
 * 📂 文件路径：app/(auth)/login.tsx
 * 📝 功能简介：登录页面（大脑），负责调用登录逻辑并跳转
 * ------------------------------------------------------------------
 */

import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthForm } from '../../src/features/auth/components/AuthForm';
import { useAuth } from '../../src/features/auth/hooks/useAuth';

export default function LoginScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { signIn, signUp, loading, error } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    if (mode === 'login') {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onToggleMode={() => setMode(mode === 'login' ? 'register' : 'login')}
        loading={loading}
        error={error}
      />
    </SafeAreaView>
  );
}
