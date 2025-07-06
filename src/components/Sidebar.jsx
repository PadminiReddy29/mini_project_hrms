import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('username');
+    localStorage.removeItem('emp_id'); // Clear user data on logout
      navigate('/login');
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <Sider>
      <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        MENU
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['home']}
        onClick={handleMenuClick}
        items={[
          { key: 'home', icon: <HomeOutlined />, label: 'Home' },
          { key: 'team', icon: <TeamOutlined />, label: 'Team' },
          { key: 'attendance', icon: <CalendarOutlined />, label: 'Attendance' },
          { key: 'leaves', icon: <FileOutlined />, label: 'Leaves' },
          { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' }
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
