# Chaos Control — Walkthrough

## 项目概述

赛博朋克风格的金克丝主题应用，前后端一体，数据存储在 Supabase。

**技术栈**：React 19 + Express + Supabase (PostgreSQL) + Tailwind CSS v4 + Motion

---

## 1. 架构总览

```
┌─────────────────────────────────────────────────┐
│                   Frontend (React)               │
│  React 19 + Tailwind CSS v4 + Motion + Lucide   │
│  src/api/ → API 客户端                           │
│  src/hooks/ → React hooks (useGallery/useCrew)   │
│  src/App.tsx → 4 页: Home / Gallery / Crew / Enlist │
└──────────────────┬──────────────────────────────┘
                   │ fetch('/api/...')
                   ▼
┌─────────────────────────────────────────────────┐
│                Backend (Express)                 │
│  Express + TypeScript + CORS                     │
│  routes/gallery.ts → GET /api/gallery            │
│  routes/crew.ts    → GET /api/crew               │
│  routes/weapons.ts → GET /api/weapons            │
│  routes/stats.ts   → GET /api/stats              │
│  routes/enlist.ts  → POST /api/enlist            │
└──────────────────┬──────────────────────────────┘
                   │ Supabase SDK
                   ▼
┌─────────────────────────────────────────────────┐
│              Supabase (PostgreSQL)               │
│  gallery_items | crew_members | weapons          │
│  stats         | enlistments                    │
│  RLS: 公开读取，任何人可提交招募                  │
└─────────────────────────────────────────────────┘
```

---

## 2. 数据库 Schema

### gallery_items
| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| title | text | 标题 |
| category | text | MAYHEM / ARSENAL / GRAFFITI |
| image_url | text | 图片 URL |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间（自动） |

### crew_members
| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| name | text | 角色名 |
| threat_level | int | 1-5 |
| status | text | 状态标签 |
| color | text | cyan / pink / red |
| badge | text | 徽章文字 |
| image_url | text | 图片 URL |

### weapons
| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| name | text | 武器名 |
| description | text | 描述 |
| image_url | text | 图片 URL |
| color | text | cyan / pink |

### stats
| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| label | text | 标签 |
| value | text | 值 |
| progress | int | 0-100 |
| color | text | cyan / pink |

### enlistments
| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| alias | text | 代号 |
| specialty | text | explosives / sniping / hacking / chaos |
| manifesto | text | 宣言 |
| created_at | timestamptz | 提交时间 |

---

## 3. 前端页面结构

### HomePage
- **Hero**：全屏背景图 + 标题 + 加入混乱按钮
- **Dossier**：实验对象数据卡片（StatBar 组件）
- **Arsenal**：武器卡片（WeaponCard 组件）
- **Gallery 预览**：4 张随机图片
- **Wanted Poster**：招募表单

### GalleryPage
- 分类筛选：ALL / MAYHEM / ARSENAL / GRAFFITI
- Masonry 瀑布流布局
- 悬浮效果 + 标签

### CrewPage
- 角色卡片 + 威胁等级条
- 状态标签
- 扫描新信号按钮

### EnlistPage
- 代号输入
- 专业选择（4 选多）
- 宣言文本框
- 提交按钮

---

## 4. 后端 API

### GET /api/gallery
返回所有画廊项目。

### GET /api/gallery/:category
按分类筛选。

### GET /api/crew
按威胁等级降序返回。

### GET /api/weapons
按创建时间升序返回。

### GET /api/stats
返回所有统计项。

### POST /api/enlist
提交招募表单，写入 enlistments 表。

---

## 5. 前端数据流

```
App.tsx
  ├── useGallery()     → galleryApi.getAll()    → GET /api/gallery
  ├── useCrew()        → crewApi.getAll()        → GET /api/crew
  ├── useWeapons()     → weaponsApi.getAll()     → GET /api/weapons
  ├── useStats()       → statsApi.getAll()       → GET /api/stats
  └── useEnlistment()  → enlistApi.submit()      → POST /api/enlist
```

每个 hook 返回 `{ data, loading, error }`。

---

## 6. 关键修复

### Tailwind 动态类名
**问题**：`border-${color === 'cyan' ? 'chaos-cyan' : 'chaos-pink'}` 在 Tailwind v4 中不会生成样式。

**修复**：
```tsx
// ❌ 错误
className={`border-${color === 'cyan' ? 'chaos-cyan' : 'chaos-pink'}`}

// ✅ 正确
const colorClasses = color === 'cyan'
  ? { border: 'border-chaos-cyan' }
  : { border: 'border-chaos-pink' };
className={colorClasses.border}
```

---

## 7. 部署步骤

1. 创建 Supabase 项目
2. 运行 `supabase/schema.sql`
3. 配置 `.env`
4. `npm install`（根目录、backend、frontend）
5. `npm run db:seed`
6. `npm run dev`

---

## 8. 文件清单

```
chaos-control/
├── supabase/schema.sql          # 数据库 schema
├── backend/src/
│   ├── index.ts                 # Express 入口
│   ├── lib/supabase.ts          # Supabase 客户端
│   ├── routes/
│   │   ├── gallery.ts           # 画廊 API
│   │   ├── crew.ts              # 船员 API
│   │   ├── weapons.ts           # 武器 API
│   │   ├── stats.ts             # 统计 API
│   │   └── enlist.ts            # 招募 API
│   └── scripts/seed-db.ts       # 种子数据
├── frontend/src/
│   ├── App.tsx                  # 主组件
│   ├── main.tsx                 # 入口
│   ├── index.css                # Tailwind + 自定义样式
│   ├── api/index.ts             # API 客户端
│   └── hooks/useApi.ts          # React hooks
├── package.json                 # 根目录配置
├── README.md                    # 项目说明
├── DEPLOY.md                    # 部署指南
└── WALKTHROUGH.md               # 本文档
```
