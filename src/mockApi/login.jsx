import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();
    if (body?.username && body?.password) {
      const now = Math.floor(Date.now() / 1000)
      const payload = { sub: body.username, name: body.username, role: 'admin', iat: now, exp: now + 3600, iss: 'mock.api' }
      function base64urlFromString(str) {
        return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/,'')
      }
      const header = base64urlFromString(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const pl = base64urlFromString(JSON.stringify(payload))
      const bytes = new Uint8Array(32); crypto.getRandomValues(bytes)
      const sigHex = Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('')
      const sig = base64urlFromString(sigHex)
      const token = `${header}.${pl}.${sig}`
      return HttpResponse.json({ token, userInfo: { name: body.username, role: 'admin' } })
    }
    return new HttpResponse(JSON.stringify({ error: "invalid" }), {
      status: 400,
    });
  }),
];
