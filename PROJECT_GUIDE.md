# 胶囊衣橱 App — 项目导航图

> 最后更新：第一批地基代码完成

| 文件路径 | 功能名称 | 小白功能介绍 | 检索关键词 |
|---|---|---|---|
| `src/types/index.ts` | 全局类型定义 | 所有数据结构的"说明书"，定义了衣物、搭配、用户长什么样 | 接口, Interface, 枚举, 类型 |
| `src/lib/supabase.ts` | 数据库连接 | App 连接云端数据库的钥匙，所有数据读写都从这里走 | 数据库, Supabase, 连接 |
| `src/hooks/useSession.ts` | 登录状态监听 | 随时检测用户是否已登录，决定显示登录页还是主界面 | 登录, session, 认证 |
| `src/features/auth/hooks/useAuth.ts` | 登录/注册/退出逻辑 | 处理账号相关操作的遥控器 | 登录, 注册, 退出, auth |
| `src/features/auth/components/AuthForm.tsx` | 登录注册表单 | 显示邮箱密码输入框和提交按钮 | 表单, 登录, 注册 |
| `app/_layout.tsx` | 根布局 | App 最外层容器，提供数据请求能力和登录守卫 | 布局, QueryClient, 守卫 |
| `app/index.tsx` | 启动入口 | App 打开时显示加载动画，然后跳转到对应页面 | 入口, 跳转, loading |
| `app/(auth)/_layout.tsx` | 认证路由布局 | 登录/注册页面的外层容器 | 认证, auth |
| `app/(auth)/login.tsx` | 登录/注册页 | 用户账号登录或创建新账号的页面 | 登录, 注册, 账号 |
| `app/(tabs)/_layout.tsx` | 底部 Tab 导航 | 底部「衣橱」「搭配」两个 Tab 的配置 | Tab, 导航, 底部栏 |
| `app/(tabs)/wardrobe/index.tsx` | 衣橱列表页 | 展示用户所有衣物的主页面（开发中） | 衣橱, 列表, 单品 |
| `app/(tabs)/outfit/index.tsx` | 搭配列表页 | 展示用户所有搭配的主页面（开发中） | 搭配, 列表 |
| `tailwind.config.js` | 样式配置 | NativeWind 样式系统的配置文件 | 样式, Tailwind, NativeWind |
| `babel.config.js` | 编译配置 | Expo 项目的代码编译配置 | 编译, babel |
| `global.css` | 全局样式入口 | Tailwind 样式的全局引入文件 | 样式, CSS |
| `.env` | 环境变量 | 存放 Supabase 连接密钥（不提交 Git）| 密钥, 环境变量, Supabase |
