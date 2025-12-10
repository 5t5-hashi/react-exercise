import { Button, Input, Form, Checkbox, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.js";
import styles from "./index.module.scss";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  async function onFinish(values) {
    setLoading(true);
    try {
      const token = values?.info?.username || "token";
      setToken(token);
      msgApi.success("登录成功");
      navigate("/welcome");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {contextHolder}
      <div className={styles.card}>
        <Typography.Text className={styles.title}>欢迎登录</Typography.Text>

        <Form
          className={styles.form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{ info: { username: 'admin', password: '123456' } }}
        >
          <Form.Item
            name={["info","username"]}
            label="用户名"
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
            label="密码"
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
              <Checkbox defaultChecked>记住我</Checkbox>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
