# Chaos Control 部署指南

## 🚀 快速部署

### 1. Supabase 数据库设置

1. 创建 Supabase 项目：https://supabase.com/dashboard
2. 在 SQL Editor 中运行 `supabase/schema.sql`
3. 复制你的项目 URL 和 anon key

### 2. 环境变量配置

```bash
# Backend (.env)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3001

# Frontend (.env)
VITE_API_URL=http://localhost:3001/api
```

### 3. 安装依赖

```bash
# 根目录
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 4. 种子数据

```bash
npm run db:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

## 🌐 生产部署

### Vercel (Frontend)

1. 连接 GitHub 仓库
2. 设置环境变量：`VITE_API_URL`
3. 部署

### Railway/Render (Backend)

1. 连接 GitHub 仓库
2. 设置环境变量：`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`
3. 部署

## 📁 项目结构

```
chaos-control/
├── backend/          # Express API
├── frontend/         # React 前端
├── supabase/         # 数据库 schema
├── package.json      # 根目录配置
└── README.md
```

## 🔧 常见问题

### Q: 图片加载失败？
A: Google 图片链接可能 403，需要下载到本地或使用其他图床。

### Q: Tailwind 样式不生效？
A: 确保使用完整类名，不要用模板字符串动态生成类名。

### Q: 数据库连接失败？
A: 检查 Supabase 凭据是否正确，RLS 策略是否配置。
