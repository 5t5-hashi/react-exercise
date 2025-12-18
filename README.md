# React + Vite

本项目接口用msw模拟，无需启动后端服务

## 菜单与功能清单（方案1：电商后台管理系统）

- 仪表盘（`/dashboard`）
  - 今日概览：订单数、营收、客单价、库存预警
  - 趋势图：日/周/月销售与订单趋势
  - 待办提醒：待发货、退款申请、低库存

- 订单管理（`/orders`）
  - 订单列表：搜索（订单号/用户/状态/时间）、筛选、分页、导出 CSV
  - 订单详情：收货信息、支付状态、物流信息、备注
  - 状态流转：待付款/已付款/待发货/已发货/已完成/已取消
  - 售后退款：`/orders/refunds` 申请列表、审核、退款进度
  - 批量操作：批量发货、批量标记

- 商品管理（`/products`）
  - 商品列表：上/下架、库存、价格、搜索
  - 新建/编辑商品：`/products/new` 图片上传、规格、分类、标签、表单校验
  - 分类与品牌：增删改查
  - 库存预警：阈值设置与提醒

- 客户管理（`/customers`）
  - 客户列表：搜索、分页、标签
  - 客户详情：订单历史、联系方式、评价记录
  - 分群：RFM 简化（最近购买、频次、金额）

- 数据分析（`/analytics`）
  - 销售趋势与商品 TOP
  - 转化漏斗：浏览→加购→下单→支付
  - 客单价、复购率、留存基础分析
  - 数据导出（CSV）

- 系统设置（`/settings`）
  - 账号与角色：admin/user（角色权限控制菜单与操作）
  - 菜单配置（可选）：支持后端返回动态菜单渲染
  - 店铺信息、物流与支付配置项

- 消息中心（`/notifications`）
  - 通知列表：订单提醒、库存预警、退款申请
  - 消息设置：通知渠道开关与频率

### 路由映射建议
- 仪表盘：`/dashboard`
- 订单管理：`/orders`，退款：`/orders/refunds`
- 商品管理：`/products`，新建：`/products/new`
- 客户管理：`/customers`
- 数据分析：`/analytics`
- 系统设置：`/settings`
- 消息中心：`/notifications`

### 接口与 Mock 建议（基于 MSW）
- 订单：`GET /api/orders`、`GET /api/orders/:id`、`PATCH /api/orders/:id`
- 商品：`GET /api/products`、`POST /api/products`、`PATCH /api/products/:id`
- 客户：`GET /api/customers`、`GET /api/customers/:id`
- 菜单随登录返回：`POST /api/login` 返回 `token`、`userInfo`、`menus`

### 使用说明
- 登录成功后将 `menus` 写入状态管理（如 `zustand`），用于侧栏动态渲染与权限控制
- 页面开发优先顺序（两周 MVP）：
  - 第1周：登录鉴权、订单列表（筛选/分页/导出）、订单详情（状态流转）
  - 第2周：商品新增/编辑、仪表盘核心指标卡片、客户列表基础
