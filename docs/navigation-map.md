# 微圈 · 导航地图

> 用户如何进入、浏览并完成各个操作；实线为主流程，虚线为受保护的跳转。

```mermaid
flowchart TD
    Start((访问应用)) --> HasToken{已登录?}

    HasToken -- "否" --> Login[登录页 /login]
    HasToken -- "是" --> Home[新鲜事首页 /]

    Login -- "无账号 → 去注册" --> Register[注册页 /register]
    Login -- "登录成功" --> Home
    Register -- "注册成功 → 自动登录" --> Home

    Login -. "已登录访问" -.-> Home
    Register -. "已登录访问" -.-> Home

    Home -- "顶栏 · 发现用户" --> Explore[发现用户 /explore]
    Home -- "点击帖子" --> PostDetail[帖子详情 /posts/:id]
    Home -- "点击作者名 / 头像" --> Profile[个人主页 /u/:id]
    Home -- "写新鲜事 → 发布" --> Home

    Explore -- "搜索用户名 / 昵称" --> Explore
    Explore -- "点击 关注 / 已关注" --> Explore
    Explore -- "点击用户" --> Profile

    PostDetail -- "点赞 / 取消点赞" --> PostDetail
    PostDetail -- "发表评论" --> PostDetail
    PostDetail -- "点击作者" --> Profile

    Profile -- "查看 粉丝 / 关注 弹窗" --> Profile
    Profile -- "点击帖子" --> PostDetail
    Profile -- "关注 / 取关" --> Profile

    Home -- "退出登录" --> Logout[回到登录页 /login]
    Profile -- "退出登录" --> Logout
    PostDetail -- "退出登录" --> Logout

    %% 受保护路由
    subgraph Protected[登录保护]
        Home
        Explore
        Profile
        PostDetail
    end
    Protected -. "未登录 → 重定向 /login" .-> Login
```

## 页面与路由

| 页面 | 路由 | 访问条件 | 主要入口 |
| --- | --- | --- | --- |
| 登录 | /login | 未登录 | 首次访问、退出后 |
| 注册 | /register | 未登录 | 登录页「立即注册」 |
| 新鲜事（信息流） | / | 需登录 | 登录后默认落地页 |
| 发现用户 | /explore | 需登录 | 顶栏导航 |
| 个人主页 | /u/:id | 需登录 | 点击任何作者名 / 头像 |
| 帖子详情 | /posts/:id | 需登录 | 点击帖子正文 / 评论数 |

## 关键用户旅程

1. **新用户**：注册（填用户名/昵称/密码/签名）→ 自动登录 → 进入空信息流 → 去「发现用户」关注好友。
2. **内容消费**：进入首页 → 浏览新鲜事 → 点进帖子详情 → 点赞、评论。
3. **社交连接**：搜索用户 → 关注 → 对方发帖后出现在自己信息流；粉丝数实时更新。
4. **内容生产**：首页顶部发帖框 → 发布 → 即时出现在自己的新鲜事顶部；可删除自己的帖子。
