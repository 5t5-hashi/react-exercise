import { useEffect, useState } from "react";
import {
  getBrands,
  addBrand,
  deleteBrand,
  updateBrand,
} from "@/api/product.js";

import { Button, Form, Input, Space, Table, Image, Modal } from "antd";

const ProductBrands = () => {
  console.log(Form.useForm());

  const [searchForm] = Form.useForm();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    size: 10,
  });
  const [loading, setLoading] = useState(false);

  // 获取数据的方法
  const getData = async () => {
    setLoading(true);
    try {
      const res = await getBrands({
        page: pagination.page,
        size: pagination.size,
        ...searchForm.getFieldsValue(),
      });
      setData(res.records);
      setPagination((prev) => ({
        ...prev,
        total: res.total,
      }));
    } catch (error) {
      console.error("获取品牌列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const pageChange = (page, size) => {
    setPagination((prev) => ({
      ...prev,
      page,
      size,
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
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (value, record, index) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                form.setFieldsValue(record);
                setIsModalOpen(true);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                deleteBrand(record.id).then(() => {
                  getData();
                });
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const onReset = () => {
    searchForm.resetFields();
    getData();
  };

  const addEdit = async () => {
    try {
      if (form.getFieldValue("id")) {
        await updateBrand(form.getFieldsValue());
      } else {
        await addBrand(form.getFieldsValue());
      }
      setIsModalOpen(false);
      getData();
    } catch (error) {
      console.error("添加/更新品牌失败:", error);
    }
  };

  return (
    <div className="p-4">
      <Form form={searchForm} layout="inline" onFinish={getData}>
        <Form.Item label="品牌名称" name="name">
          <Input placeholder="请输入品牌名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
            <Button
              type="primary"
              onClick={() => {
                form.setFieldsValue({
                  id: null,
                  name: "",
                  logo: "",
                  description: "",
                });
                setIsModalOpen(true);
              }}
            >
              新增品牌
            </Button>
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
          page: pagination.page,
          size: pagination.size,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
      <Modal
        title={form.getFieldValue("id") ? "更新品牌" : "添加品牌"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={addEdit}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="品牌名称" name="name">
            <Input placeholder="请输入品牌名称" />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Input placeholder="请输入Logo URL" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea placeholder="请输入品牌描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductBrands;
