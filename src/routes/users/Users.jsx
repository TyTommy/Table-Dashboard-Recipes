import { useEffect, useState } from "react";
import { Table, Select, Button, Popconfirm, message } from "antd";
import axios from "../../api/axios";
import request from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });

  useEffect(() => {
    try {
      setLoading(true);
      request
        .get("/users")
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (item) => (
        <img
          style={{ borderRadius: "50%" }}
          height={50}
          width={50}
          src={item}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      render: () => (
        <>
          <Popconfirm
            title="Promote the user"
            description="Are you sure to promote this user?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Promote</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleChange = (value) => {
    setTableParams({
      pagination: {
        ...tableParams,
        ...tableParams.pagination,
        pageSize: value,
      },
    });
  };

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
      <Select
        defaultValue="50  "
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "50",
            label: "50",
          },
          {
            value: "75",
            label: "75",
          },
          {
            value: "100",
            label: "100",
          },
        ]}
      />
    </div>
  );
};

export default Users;
