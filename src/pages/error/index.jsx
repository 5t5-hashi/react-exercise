import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={<Button type="primary" onClick={handleBack}>返回</Button>}
    />
  )
}
