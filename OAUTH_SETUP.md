# Google OAuth 配置指南

## 错误说明
如果您看到 `redirect_uri_mismatch` 错误，说明 Google OAuth 应用的重定向URI配置需要更新。

## 当前配置信息
- **NextAuth回调URL**: `http://localhost:3000/api/auth/callback/google`
- **Google Client ID**: `1069114584154-ut5rcqc0sdbf4p1d6nkkngbite2jaf0i.apps.googleusercontent.com`

## 修复步骤

### 1. 访问 Google Cloud Console
打开 [Google Cloud Console](https://console.cloud.google.com/)

### 2. 导航到 OAuth 设置
1. 选择您的项目
2. 点击左侧菜单 → `API和服务` → `凭据`
3. 找到 OAuth 2.0 客户端ID: `1069114584154-ut5rcq...`

### 3. 编辑授权重定向URI
1. 点击客户端ID旁的 ✏️ 编辑按钮
2. 在"已获授权的重定向URI"部分，确保包含：
   ```
   http://localhost:3000/api/auth/callback/google
   ```

### 4. 添加可能需要的其他URI
根据您的部署环境，可能还需要添加：
```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google  # 生产环境
```

### 5. 保存更改
- 点击"保存"按钮
- 更改通常在几分钟内生效

## 验证配置
配置完成后：
1. 重新访问 http://localhost:3000/sign-in
2. 点击"使用Google账号登录"
3. 应该能正常跳转到Google授权页面

## 故障排查

### 如果仍然出现错误：
1. **等待几分钟** - Google配置更改需要时间生效
2. **清除浏览器缓存** - 特别是认证相关的缓存
3. **检查URI完全匹配** - 确保没有多余的斜杠或字符
4. **验证项目选择** - 确保在正确的Google Cloud项目中进行配置

### 常见问题：
- ❌ `http://localhost:3000/api/auth/callback/google/` (多了斜杠)
- ❌ `http://localhost:3000/callback/google` (缺少api/auth)
- ✅ `http://localhost:3000/api/auth/callback/google` (正确)

## 联系支持
如果问题持续存在，请提供以下信息：
- 完整的错误消息
- Google Cloud Console中配置的重定向URI截图
- 浏览器开发者工具中的网络请求详情

---
*此文件由 Claude Code 自动生成*