import { http, HttpResponse } from "msw";

const menuList = [
  { key: "/dashboard/index", label: "仪表盘" },
  // { key: '/orders', label: '订单管理', children: [
  //   { key: '/orders/orderList/index', label: '订单列表' },
  //   { key: '/orders/refunds/index', label: '售后退款' }
  // ]},
  // { key: '/products', label: '商品管理', children: [
  //   { key: '/products/productList/index', label: '商品列表' },
  //   { key: '/products/new/index', label: '新建商品' }
  // ]},
  // { key: '/customers/index', label: '客户管理'},
  // { key: '/analytics/index', label: '数据分析' },
  // { key: '/settings/index', label: '系统设置' },
  // { key: '/notifications/index', label: '消息中心' }
];

export const login = [
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();
    if (body?.username && body?.password) {
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        sub: body.username,
        name: body.username,
        role: "admin",
        iat: now,
        exp: now + 3600,
        iss: "mock.api",
      };
      function base64urlFromString(str) {
        return btoa(unescape(encodeURIComponent(str)))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
      const header = base64urlFromString(
        JSON.stringify({ alg: "HS256", typ: "JWT" })
      );
      const pl = base64urlFromString(JSON.stringify(payload));
      const bytes = new Uint8Array(32);
      crypto.getRandomValues(bytes);
      const sigHex = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const sig = base64urlFromString(sigHex);
      const token = `${header}.${pl}.${sig}`;
      return HttpResponse.json({
        token,
        userInfo: { name: body.username, role: "admin" },
        menuList,
      });
    }
    return new HttpResponse(JSON.stringify({ error: "invalid" }), {
      status: 400,
    });
  }),
];
