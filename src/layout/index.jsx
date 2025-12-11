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

import styles from "./index.module.scss";

const items = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Item 1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
      {
        key: "g2",
        label: "Item 2",
        type: "group",
        children: [
          { key: "3", label: "Option 3" },
          { key: "4", label: "Option 4" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13", label: "Option 13" },
      { key: "14", label: "Option 14" },
    ],
  },
];

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

  // 点击右上角菜单
  const onUserMenuClick = ({ key }) => {
    if (key === "logout") {
      clearAuth();
      navigate("/login");
    }
  };

  const onClick = ({ key }) => {
    console.log(key);
  };

  return (
    <Layout className={styles.appLayout}>
      <Sider className={styles.appSider}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
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
            <Dropdown menu={{ items: menuRight, onClick: onUserMenuClick }}>
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
