import { Typography, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.js'
import styles from './index.module.scss'

export default function Welcome() {
  const username = useAuthStore(s => s.token)
  const clearAuth = useAuthStore(s => s.clearAuth)
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <SmileOutlined className={styles.icon} />
          <Typography.Title level={3} className={styles.title}>
            欢迎回来{username ? `，${username}` : ''}
          </Typography.Title>
          <Typography.Text className={styles.subtitle}>祝你今天顺利</Typography.Text>
        </div>
      </div>
    </div>
  )
}
