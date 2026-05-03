# Chaos Control - Jinx Cyberpunk Experience

前后端一体的赛博朋克风格金克丝主题应用。

## 🚀 快速开始

### 1. 设置 Supabase 数据库

1. 创建 Supabase 项目：https://supabase.com/dashboard
2. 在 SQL Editor 中运行 `supabase/schema.sql`
3. 复制项目 URL 和 anon key

### 2. 配置环境变量

```bash
# Backend
cd backend
cp .env.example .env
# 编辑 .env 填入你的 Supabase 凭据

# Frontend
cd frontend
cp .env.example .env
```

### 3. 安装依赖并启动

```bash
# 安装根目录依赖
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..

# 种子数据
npm run db:seed

# 启动开发服务器
npm run dev
```

## 📁 项目结构

```
chaos-control/
├── backend/          # Express API 后端
│   ├── src/
│   │   ├── routes/   # API 路由
│   │   ├── lib/      # Supabase 客户端
│   │   └── scripts/  # 数据库脚本
│   └── package.json
├── frontend/         # React 前端
│   ├── src/
│   │   ├── api/      # API 客户端
│   │   ├── hooks/    # React hooks
│   │   └── App.tsx   # 主组件
│   └── package.json
└── supabase/         # 数据库 schema
    └── schema.sql
```

## 🗄️ 数据库表

| 表名 | 用途 |
|------|------|
| gallery_items | 画廊图片 |
| crew_members | 船员信息 |
| weapons | 武器库 |
| stats | 实验对象数据 |
| enlistments | 招募表单 |

## 🔌 API 端点

- `GET /api/gallery` - 获取所有画廊
- `GET /api/gallery/:category` - 按分类获取
- `GET /api/crew` - 获取所有船员
- `GET /api/weapons` - 获取所有武器
- `GET /api/stats` - 获取所有统计
- `POST /api/enlist` - 提交招募

## 🛠️ 技术栈

- **前端**: React 19 + TypeScript + Tailwind CSS v4
- **后端**: Express + TypeScript
- **数据库**: Supabase (PostgreSQL)
- **样式**: Tailwind CSS + Motion 动画

## 📝 已修复的问题

1. ✅ Tailwind 动态类名问题（WeaponCard、CrewPage）
2. ✅ 前后端 API 集成
3. ✅ Supabase 数据库 schema
4. ✅ 种子数据脚本
5. ✅ 环境变量配置
6. ✅ 字体混排优化

## 🌐 部署

详见 [DEPLOY.md](./DEPLOY.md)
