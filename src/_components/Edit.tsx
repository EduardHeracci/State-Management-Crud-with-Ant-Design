import React, { useState } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Typography } from "antd";
import { UserInformation } from "../types";
import { useStoreUserInformation } from "../_hooks/useStoreUserInformation";
import dayjs from "dayjs";

const { Link } = Typography;

const EditUser: React.FC<{ record: UserInformation }> = ({ record }) => {
  const { updateUser } = useStoreUserInformation();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (value: UserInformation) => {
    updateUser(record.id, value);
    setOpen(false);
  };

  return (
    <>
      <Link style={{ color: "greenyellow" }} onClick={showDrawer}>
        Edit
      </Link>
      <Drawer placement="left" width={500} title="Add New User" onClose={onClose} open={open}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...record, birth_date: dayjs(record.birth_date) }}>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item<UserInformation>
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "Please input the first name" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<UserInformation> label="Middle Name" name="middle_name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<UserInformation>
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Please input the last name" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<UserInformation> label="Suffix" name="suffix">
                <Select
                  options={[
                    {
                      label: "Jr",
                      value: "Jr",
                    },
                    {
                      label: "Sr",
                      value: "Sr",
                    },
                    {
                      label: "I",
                      value: "I",
                    },
                    {
                      label: "II",
                      value: "II",
                    },
                    {
                      label: "III",
                      value: "III",
                    },
                    {
                      label: "IV",
                      value: "IV",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<UserInformation>
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please input the address" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<UserInformation>
                label="Birth Date"
                name="birth_date"
                rules={[{ required: true, message: "Please input the birth date" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Space style={{ float: "right" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default EditUser;
