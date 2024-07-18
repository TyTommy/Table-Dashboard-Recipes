import { BiMenu } from "react-icons/bi"; 
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Input } from "antd";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input;

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const onSearch = () => {};

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <NavLink className={"sidebar__link"} to="/product">
                    Products
                  </NavLink>
                ),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <NavLink className={"sidebar__link"} to="/users">
                    Users
                  </NavLink>
                ),
              },
              {
                key: "3",
                icon: <BiMenu />,
                label: (
                  <NavLink className={"sidebar__link"} to="/recipes">
                    Recipes
                  </NavLink>
                ),
              },
            ]}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              paddingLeft: "0px",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "#fff",
              }}
            />
            <Search
              placeholder="Search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "lightgrey",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
