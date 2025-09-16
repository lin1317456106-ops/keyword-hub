# 🚀 KeywordHub - 关键词聚合分析平台

一个聚合多个数据源的关键词研究工具，为SEO专员和内容创作者提供智能化的关键词分析服务。

## ✨ 功能特性

### 🔍 核心功能
- **智能关键词搜索** - 输入关键词获取全面分析报告
- **多数据源聚合** - 集成Google Trends等数据源
- **趋势可视化** - 12个月历史趋势数据图表
- **相关词推荐** - 自动生成相关关键词建议
- **数据导出** - 支持CSV格式导出分析结果

### 👤 用户功能
- **用户认证系统** - 基于Clerk的安全登录注册
- **查询历史** - 永久保存用户查询记录
- **使用限制** - 免费用户每日10次查询限制
- **智能缓存** - 提高查询响应速度

## 🛠️ 技术栈

### 前端
- **Next.js 15** - React全栈框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **Recharts** - 数据可视化图表库
- **Lucide React** - 现代图标库

### 后端
- **Next.js API Routes** - 全栈API端点
- **Clerk** - 用户认证和管理
- **Supabase** - PostgreSQL数据库服务
- **Vercel** - 部署和托管平台

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript** - 静态类型检查
- **Turbopack** - 快速打包工具

## 🚦 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 1. 安装依赖
```bash
npm install
```

### 2. 环境配置
配置 `.env.local` 文件并填入必要的API密钥：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key-here
CLERK_SECRET_KEY=your-clerk-secret-key-here

# Application Configuration
NEXT_PUBLIC_APP_NAME=KeywordHub
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Rate Limiting
FREE_USER_DAILY_LIMIT=10
PRO_USER_MONTHLY_LIMIT=1000
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
keyword-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API路由
│   │   ├── dashboard/         # 用户仪表盘
│   │   ├── queries/          # 查询历史
│   │   ├── sign-in/          # 登录页面
│   │   ├── sign-up/          # 注册页面
│   │   ├── layout.tsx        # 根布局
│   │   └── page.tsx          # 首页
│   ├── components/            # React组件
│   │   ├── layout/           # 布局组件
│   │   ├── providers/        # 上下文提供者
│   │   └── search/          # 搜索相关组件
│   ├── lib/                  # 工具库
│   │   ├── database.ts       # 数据库访问层
│   │   ├── google-trends.ts  # Google Trends集成
│   │   ├── supabase.ts       # Supabase客户端
│   │   └── utils.ts          # 工具函数
│   └── types/                # TypeScript类型定义
├── database/                 # 数据库脚本
├── public/                   # 静态资源
└── 配置文件...
```

## 🌐 API 端点

### 搜索相关
- `POST /api/search` - 执行关键词搜索
- `GET /api/search?q=keyword` - 获取搜索建议

### 用户相关
- `GET /api/users/me` - 获取当前用户信息
- `PATCH /api/users/me` - 更新用户信息

### 查询历史
- `GET /api/queries` - 获取用户查询历史
- `POST /api/queries` - 根据ID获取查询详情

### 系统
- `GET /api/health` - 健康检查
- `POST /api/db/init` - 初始化数据库（仅开发环境）

## 📊 数据库设计

### 用户表 (users)
- id: UUID主键
- email: 用户邮箱
- query_count: 查询计数
- subscription_tier: 订阅级别
- created_at/updated_at: 时间戳

### 查询表 (queries)
- id: UUID主键
- user_id: 用户外键
- keyword: 查询关键词
- results: JSON格式结果
- status: 查询状态
- created_at/updated_at: 时间戳

### 缓存表 (keyword_cache)
- keyword: 关键词主键
- data: JSON格式缓存数据
- data_source: 数据源
- expires_at: 过期时间

## 🚀 部署

### Vercel部署（推荐）
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 自动部署完成

### 环境变量配置
确保在生产环境中正确配置所有必要的环境变量。

## 📈 MVP功能清单

✅ **已完成功能**
- [x] 用户注册登录系统
- [x] 关键词搜索功能
- [x] Google Trends数据模拟
- [x] 数据缓存机制
- [x] 趋势图表展示
- [x] 查询历史记录
- [x] CSV数据导出
- [x] 响应式设计
- [x] 用户查询限制

🔄 **下一步计划**
- [ ] 集成真实Google Trends API
- [ ] 添加Google Keyword Planner集成
- [ ] AI驱动的关键词扩展
- [ ] 批量关键词分析
- [ ] 高级数据筛选
- [ ] 团队协作功能

## 🐛 问题报告

如果您发现问题或有功能建议，请创建Issue或联系开发团队。

## 📝 许可证

MIT License - 详见LICENSE文件。

---

**KeywordHub** - 让关键词研究变得简单高效！ 🚀
