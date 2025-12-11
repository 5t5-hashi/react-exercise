import { Button, Input, Form, Typography, message, ConfigProvider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.js";
import styles from "./index.module.scss";
import { login as loginApi } from "@/api/user.js";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const [loading, setLoading] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  async function onFinish(values) {
    setLoading(true);
    try {
      const payload = {
        username: values?.info?.username,
        password: values?.info?.password,
      };
      const resp = await loginApi(payload);
      setToken(resp?.token || payload.username || "token");
      setUserInfo(resp?.userInfo || { name: '', role: '' });
      msgApi.success("登录成功");
      navigate("/welcome");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'rgba(255,255,255,0.06)',
          colorBorder: 'rgba(255,255,255,0.2)',
          colorText: '#ffffff',
          colorTextPlaceholder: 'rgba(255,255,255,0.6)',
          colorPrimary: '#4044ED',
        },
      }}
    >
      <div className={styles.page}>
        {contextHolder}
        <div className={styles.ellipsePrimaryLarge} />
        <div className={styles.ellipseSecondarySmall} />
        <div className={styles.card}>
          <Typography.Text className={styles.title}>LOGIN</Typography.Text>

        <Form
          className={styles.form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{ info: { username: 'admin', password: '123456' } }}
        >
          <Form.Item
            name={["info","username"]}
            label={<span className={styles.label}>Username</span>}
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name={["info","password"]}
            label={<span className={styles.label}>Password</span>}
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.footer}>
              <Button type="primary" htmlType="submit" loading={loading}>
                login
              </Button>
            </div>
          </Form.Item>
        </Form>
        </div>
      </div>
    </ConfigProvider>
  );
}
