import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/api/product.js";

import { Button, Form, Input, Space, Table, Modal, TreeSelect } from "antd";

// 递归构建树形结构
const buildTree = (items, parentId = 0) => {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const children = buildTree(items, item.id);
      return {
        ...item,
        key: item.id, // Ant Design Table 需要 key
        children: children.length > 0 ? children : null, // 如果没有子节点，就不返回 children 属性，否则 Table 会显示展开图标
      };
    });
};

const buildSelectTree = (items) => {
  let list = [
    {
      children: items,
      id: 0,
      key: 0,
      name: "根",
      parentId: -1,
      sort: 0,
      status: 1,
    },
  ];
  return list;
};

export default function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryForm] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      // 兼容处理：如果后端返回的是分页对象(res.records)，取 records；如果是数组，直接用
      const list = Array.isArray(res) ? res : res.records || [];

      const tree = buildTree(list, 0);
      const selectTree = buildSelectTree(tree);
      setSelectedCategory(selectTree);
      setCategories(tree);
    } catch (error) {
      console.error("获取分类失败", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger onClick={ async () =>{
             const confirmed = await Modal.confirm({
              title: '确认删除吗？',
              okText: '确认',
              okType: 'danger',
              cancelText: '取消',
            });
            console.log('Confirmed: ', confirmed);
          }}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setModalVisible(true)}>
          添加分类
        </Button>
      </div>

      <Table
        size="small"
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={false} // 树形表格一般不分页
        expandable={{
          defaultExpandAllRows: true, // 默认展开所有
        }}
      />

      <Modal
        title="添加分类"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
      >
        <Form
          form={categoryForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item label="父分类" name="parentId">
            <TreeSelect
              treeData={selectedCategory}
              fieldNames={{ label: "name", value: "id" }}
            />
          </Form.Item>
          <Form.Item label="分类名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
