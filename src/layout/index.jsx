import { Layout, Image, Dropdown, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/auth.js";
import { useMenuStore } from "@/stores/menu.js";

import styles from "./index.module.scss";

const menuRight = [
  {
    key: "logout",
    label: "退出登录",
    icon: <LogoutOutlined />,
  },
];

function LayoutComponent() {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const menuList = useMenuStore((s) => s.menuList);

  // 点击右上角菜单
  const onUserMenuClick = ({ key }) => {
    if (key === "logout") {
      clearAuth();
      navigate("/login");
    }
  };

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className={styles.appLayout}>
      <Sider className={styles.appSider}>
        <Menu
          onClick={onClick}
          mode="inline"
          items={menuList}
        />
      </Sider>
      <Layout>
        <Header className={styles.appHeader}>
          <div className="flex justify-end w-full items-center pr-20">
            <Image
              width={32}
              height={32}
              styles={{
                root: {
                  marginRight: "10px",
                },
              }}
              classNames={{
                root: "overflow-hidden rounded-full",
                img: "rounded-full",
              }}
              alt="basic"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Dropdown menu={{ items: menuRight, onClick: onUserMenuClick }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {userInfo?.name || "User"}
                  <DownOutlined className="text-[10px]" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.appContent}>
          <div className={styles.appContentInner}>
            <Outlet />
          </div>
        </Content>
        <Footer className={styles.appFooter}>由Bob开发维护</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
