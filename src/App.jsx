import { ConfigProvider } from "antd";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
// import enUS from 'antd/locale/en_US';
import zhCN from "antd/locale/zh_CN";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
