// src/components/DashboardLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#e6f7ff' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />  
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
