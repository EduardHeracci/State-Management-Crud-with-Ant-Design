import { Card, Popconfirm, Space, Table, Typography } from "antd";
import type { TableColumnsType, PopconfirmProps } from "antd";
import { UserInformation } from "../types";
import AddUser from "../_components/AddUser";
import { useStoreUserInformation } from "../_hooks/useStoreUserInformation";
import dayjs from "dayjs";
import EditUser from "../_components/Edit";

const { Link, Title } = Typography;

function UserInformationPage() {
  const { userData, removeUser } = useStoreUserInformation();

  const confirm = (id: string) => {
    removeUser(id);
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const columns: TableColumnsType<UserInformation> = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      key: "middle_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Suffix",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "Age",
      dataIndex: "birth_date",
      key: "age",
      render: (value) => {
        const birthDate = dayjs(value);
        const age = dayjs().diff(birthDate, "year");
        return <>{age}</>;
      },
    },
    {
      title: "Birth Date",
      dataIndex: "birth_date",
      key: "birth_date",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditUser record={record} />
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this user?"
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <Link style={{ color: "red" }}>Delete</Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={2}>User Information</Title>
        <AddUser />
      </Space>
      <Table<UserInformation> bordered columns={columns} dataSource={userData} />
    </Card>
  );
}

export default UserInformationPage;
