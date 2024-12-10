# Plex 风格图床

一个简单的图床应用，支持图片上传、压缩和管理。

## 特性

- 密码保护，确保安全访问
- 支持拖拽上传多个图片
- 自动压缩图片
- 提供图片URL和Markdown格式链接
- 使用对象存储服务保存图片
- Plex风格的深色主题UI

## 环境变量

在部署之前，需要在Vercel的项目设置中配置以下环境变量：

```bash
VITE_AUTH_PASSWORD              =     # 访问密码
VITE_AWS_REGION                 =       # AWS区域
VITE_AWS_ACCESS_KEY_ID                 = # AWS访问密钥ID
VITE_AWS_SECRET_ACCESS_KEY                 = # AWS密钥
VITE_AWS_BUCKET_NAME                 =  # S3存储桶名称
VITE_AWS_ENDPOINT                 =     # S3端点URL
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

1. Fork 此仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成！
