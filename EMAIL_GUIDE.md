# 智能邮件助手指南

## 📧 邮件工具配置

### 小莉（云端）配置
- **位置：** CodeSpace
- **邮箱：** 需要配置
- **Notion 集成：** ✅ 已配置

### 小雅（本地）配置
- **位置：** 本地电脑 `C:\Users\宗晖\clawd`
- **智能助手：** ✅ 已启动
- **启动脚本：** `启动智能助手.bat`

---

## 🔑 邮箱账户配置

### 支持的服务
- ✅ Gmail（推荐，稳定）
- ✅ Outlook（企业/个人）
- ✅ iCloud
- ✅ QQ / 163 邮箱
- ✅ 企业邮箱

### 配置方式

#### 方式 1：环境变量（推荐用于开发）
```bash
# Gmail
export GMAIL_CLIENT_ID="your-client-id"
export GMAIL_CLIENT_SECRET="your-client-secret"
export GMAIL_REFRESH_TOKEN="your-refresh-token"

# Outlook
export OUTLOOK_CLIENT_ID="your-client-id"
export OUTLOOK_CLIENT_SECRET="your-client-secret"

# QQ
export QQ_EMAIL="your-qq-email@qq.com"
export QQ_PASSWORD="your-password"
```

#### 方式 2：配置文件
创建 `config/email.json`：
```json
{
  "providers": {
    "gmail": {
      "clientId": "your-client-id",
      "clientSecret": "your-client-secret",
      "refreshToken": "your-refresh-token"
    },
    "outlook": {
      "clientId": "your-client-id",
      "clientSecret": "your-client-secret"
      "email": "your-email@outlook.com"
      "password": "your-password"
    },
    "qq": {
      "email": "your-qq-email@qq.com",
      "password": "your-password"
    }
  },
  "defaultProvider": "gmail"
}
```

---

## 📧 邮件过滤策略

### 系统邮件过滤

**跳过的邮件类型：**
- `Delivery Status Notification` - 配送状态通知
- `Undelivered` - 未送达
- `Delivery Failure` - 配送失败
- `Mail Delivery` - 邮件送达
- `Auto Reply` - 自动回复
- `Nondelivery Report` - 未送达报告
- `Mail Failure` - 邮件失败
- `Delivery failed` - 配送失败

### 智能过滤

**优先级规则：**
1. **用户邮件** - 最高优先级
   - 发件人：`zonghui.nas@gmail.com`（宗晖的邮箱）
   - 发件人：白名单中的邮箱
   - 主题关键词：`订单`、`会议`、`重要`、`任务`、`项目`

2. **订阅邮件** - 中等优先级
   - 主题关键词：`newsletter`、`订阅`、`日报`、`简报`
   - 来自已知订阅商

3. **系统邮件** - 低优先级（跳过）
   - 主题：上述系统邮件关键词
   - 发件人：`noreply@`、`no-reply@`、`admin@`

---

## 📝 邮件模板管理

### 模板存储位置
- **小雅本地：** `C:\Users\宗晖\clawd\templates\`
- **Notion 数据库：** 创建邮件模板数据库

### 模板类型

#### 1. 通知模板
```
主题：会议提醒
正文：
尊敬的 [姓名]，

您好！这是一封会议提醒通知。

📅 会议时间：[日期] [时间]
📍 会议地点：[地点]
👥 参会人员：[人员列表]

请准时参加会议。

此致
敬礼！

[发送方]
```

#### 2. 任务模板
```
主题：新任务分配
正文：
您好 [姓名]，

您有一个新任务需要处理：

📋 任务名称：[任务名称]
📅 截止日期：[截止日期]
📝 任务描述：[任务描述]
👤 负责人：[负责人]

请在截止日期前完成。

[发送方]
```

#### 3. 报告模板
```
主题：[报告类型]报告
正文：
[收件人姓名] 您好，

以下是您的[报告类型]报告：

📊 报告周期：[开始日期] - [结束日期]
📈 关键数据：
- [数据项 1]
- [数据项 2]
- [数据项 3]

详细分析请见附件。

此致
敬礼！

[发送方]
```

---

## 🔄 邮件处理流程

### 1. 接收邮件
```
智能助手接收
  ↓
应用过滤规则
  ↓
分类邮件类型
  ↓
存储到数据库/Notion
```

### 2. 发送邮件
```
用户请求
  ↓
选择邮件模板
  ↓
填充动态数据
  ↓
通过邮件API发送
  ↓
记录发送历史
```

---

## 📊 邮件统计和分析

### 统计指标
- **接收量：** 每日/每周/每月
- **发送量：** 每日/每周/每月
- **分类统计：** 按邮件类型统计
- **发件人统计：** TOP 发件人列表
- **响应时间：** 平均响应时间

### 报告类型
- **日报：** 当日邮件摘要
- **周报：** 本周邮件汇总
- **月报：** 本月邮件分析报告

---

## 🛡️ 安全和隐私

### 数据保护
- ✅ 敏感信息加密存储
- ✅ 密钥安全保管（环境变量或加密配置文件）
- ✅ 定期轮换访问令牌
- ✅ 日志脱敏（不记录完整邮箱地址）

### 权限控制
- ✅ 最小权限原则
- ✅ 只请求必要的 API 权限
- ✅ 定期审计访问权限

---

## 🚀 部署建议

### 小莉（云端）部署
- **环境：** Vercel / Netlify / CodeSpace 内置
- **数据库：** Supabase / Firebase / Notion
- **邮件服务：** Resend / SendGrid / Mailgun

### 小雅（本地）部署
- **环境：** Docker / 直接运行
- **数据库：** SQLite / Notion
- **邮件服务：** SMTP / 邮箱 API

---

## 📞 支持和联系

### 常见问题
1. **邮件发送失败**
   - 检查网络连接
   - 验证 API 凭证
   - 检查收件人邮箱地址

2. **模板未找到**
   - 确认模板存储路径
   - 检查模板文件名

3. **过滤规则不生效**
   - 检查关键词配置
   - 查看日志文件

### 技术支持
- 📧 邮件工具问题 → 小雅（本地）
- 🌐 云端服务问题 → 小莉（云端）
- 🔧 API 配置问题 → 两个助手都可以

---

**文档版本：** 1.0
**最后更新：** 2026-01-29
**维护者：** 小莉（云端）& 小雅（本地）
