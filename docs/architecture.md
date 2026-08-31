# 微圈 · 系统架构依赖图

```mermaid
flowchart TD
    subgraph FE["前端 React + Vite  (localhost:5173)"]
        direction TB
        Main["main.jsx<br/>ReactDOM + BrowserRouter"]
        App["App.jsx<br/>路由与登录保护"]
        AuthCtx["context/AuthContext.jsx<br/>登录态管理"]
        Api["api.js<br/>fetch 封装 · Bearer Token"]
        Layout["components/Layout.jsx<br/>顶栏导航"]
        Login["pages/Login.jsx 登录"]
        Reg["pages/Register.jsx 注册"]
        Feed["pages/Feed.jsx 新鲜事"]
        Explore["pages/Explore.jsx 发现用户"]
        Profile["pages/Profile.jsx 个人主页"]
        PostDetail["pages/PostDetail.jsx 帖子详情"]
        PostCard["components/PostCard.jsx 帖子卡片"]
        FollowBtn["components/FollowButton.jsx 关注按钮"]
        Avatar["components/Avatar.jsx 头像"]

        Main --> App
        App --> AuthCtx
        App --> Login & Reg & Layout
        Layout --> Feed & Explore & Profile & PostDetail
        Feed --> PostCard & AuthCtx & Api & Avatar
        Explore --> FollowBtn & Api & Avatar
        Profile --> FollowBtn & PostCard & Api & Avatar
        PostDetail --> Api & Avatar
        PostCard --> AuthCtx & Avatar
        FollowBtn --> AuthCtx
        Login & Reg --> AuthCtx
    end

    subgraph BE["后端 Express  (localhost:4000)"]
        direction TB
        Index["index.js 应用入口<br/>CORS · JSON · 路由挂载"]
        AuthMw["middleware/auth.js<br/>JWT 校验 · 签名"]
        AuthR["routes/auth.js<br/>注册 / 登录 / me"]
        UserR["routes/users.js<br/>用户 · 关注 · 粉丝"]
        PostR["routes/posts.js<br/>帖子 · 点赞 · 评论 · 新鲜事"]
        DB["db.js<br/>node:sqlite 建表与索引"]

        Index --> AuthR & UserR & PostR
        AuthR --> AuthMw & DB
        UserR --> AuthMw & DB
        PostR --> AuthMw & DB
    end

    subgraph SQLITE["SQLite  social.db"]
        direction LR
        Users["users<br/>用户"]
        Posts["posts<br/>帖子"]
        Follows["follows<br/>关注(单向)"]
        Likes["likes<br/>点赞"]
        Comments["comments<br/>评论"]

        Posts -->|"user_id FK"| Users
        Follows -->|"follower_id FK"| Users
        Follows -->|"followee_id FK"| Users
        Likes -->|"user_id FK"| Users
        Likes -->|"post_id FK"| Posts
        Comments -->|"user_id FK"| Users
        Comments -->|"post_id FK"| Posts
    end

    Api -.->|"HTTP /api/*<br/>Vite 代理转发"| Index
```

## API 一览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | /api/auth/register | 注册，返回 token |
| POST | /api/auth/login | 登录，返回 token |
| GET | /api/auth/me | 当前用户信息 |
| GET | /api/users?q= | 用户列表 / 搜索 |
| GET | /api/users/:id | 用户资料 + 其帖子 |
| POST/DELETE | /api/users/:id/follow | 关注 / 取关 |
| GET | /api/users/:id/followers / following | 粉丝 / 关注列表 |
| POST | /api/posts | 发帖 |
| GET | /api/posts/feed | 新鲜事（本人 + 关注者） |
| GET/DELETE | /api/posts/:id | 帖子详情 / 删除 |
| POST/DELETE | /api/posts/:id/like | 点赞 / 取消 |
| POST | /api/posts/:id/comments | 发表评论 |
