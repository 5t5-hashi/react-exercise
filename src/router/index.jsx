import { createBrowserRouter, redirect } from 'react-router-dom'
import Layout from '@/layout/index.jsx'
import Login from '@/pages/login/index.jsx'
import Welcome from '@/pages/welcome/index.jsx'
import ErrorPage from '@/pages/error/index.jsx'
import { useAuthStore } from '@/stores/auth.js'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    // 相当于vue的路由守卫，在进入路由前执行，全局守卫的替代：把 loader 放在根布局路由（ / ），就相当于全局保护其所有子路由
    loader: () => {
      let token = useAuthStore.getState().token
      if (!token) {
        const raw = localStorage.getItem('auth-store')
        if (raw) {
          try {
            const obj = JSON.parse(raw)
            if (obj && obj.state && obj.state.token) {
              token = obj.state.token
            }
          } catch (e) {
            void 0
          }
        }
      }
      if (!token) {
        return redirect('/login')
      }
      return null
    },
    children: [
      //加默认的路由，当访问/时，默认跳转到/welcome
      { index: true, element: <Welcome /> },
      { path: 'welcome', element: <Welcome /> },
    ],
  },
  // 错误路由页面
  { path: '*', element: <ErrorPage /> },
])

export default router
