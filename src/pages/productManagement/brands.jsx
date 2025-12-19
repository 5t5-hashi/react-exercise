import { useEffect, useState } from "react";
import {
  getBrands,
  addBrand,
  deleteBrand,
  updateBrand,
} from "@/api/product.js";

import { Button, Form, Input, Space, Table, Image } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};

const ProductBrands = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  // 获取数据的方法
  const getData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getBrands({
        page: pagination.current,
        size: pagination.pageSize,
        ...params
      });
      setData(res.records);
      setPagination(prev => ({
        ...prev,
        total: res.total
      }));
    } catch (error) {
      console.error('获取品牌列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const pageChange = (page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize
    }));
    getData();
  };

  // 初始加载
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "品牌名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (value, record, index) => {
        return <Image src={value} alt={value} width={50} height={50} />;
      },
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
  ];
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="p-4">
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item label="品牌名称" name="brandName">
          <Input placeholder="请输入品牌名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <Table
        className="mt-10"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: pageChange,
          current: pagination.current,
          pageSize: pagination.pageSize,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </div>
  );
};

export default ProductBrands;
