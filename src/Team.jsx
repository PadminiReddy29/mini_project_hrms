// src/pages/Team.jsx
import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Row, Col, Spin, message } from 'antd';
import { getTeamHierarchy } from './services/teamservices';   // 👈 NEW import

const { Title, Text } = Typography;

const PersonCard = ({ user, highlight }) => (
  <Card
    size="small"
    style={{
      width: 200,
      textAlign: 'center',
      background: highlight ? '#e6f7ff' : '#fff',
    }}
  >
    <Avatar size={48} style={{ backgroundColor: '#1890ff', marginBottom: 8 }}>
      {user.username[0].toUpperCase()}
    </Avatar>
    <Title level={5} style={{ margin: 0 }}>
      {user.username}
    </Title>
    <Text type="secondary">{user.role}</Text>
  </Card>
);

const Team = () => {
  const empId = localStorage.getItem('emp_id');
  const [data, setData]     = useState(null);
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTeamHierarchy(empId);   // service
        setData(res);
      } catch (err) {
        message.error(err.error || 'Failed to load team hierarchy');
      } finally {
        setLoad(false);
      }
    };
    load();
  }, [empId]);

  if (loading) return <Spin style={{ display: 'block', margin: '60px auto' }} />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>My Team </Title>

      {data.reporting_to.length > 0 && (
        <>
          <Title level={4}>Reporting To</Title>
          <Row gutter={[16, 16]} justify="center">
            {data.reporting_to.map((m) => (
              <Col key={m.emp_id}>
                <PersonCard user={m} />
              </Col>
            ))}
          </Row>
        </>
      )}

      <Row justify="center" style={{ margin: '32px 0' }}>
        <PersonCard user={data} highlight />
      </Row>

      {data.are_reporting.length > 0 && (
        <>
          <Title level={4}>Direct Reports</Title>
          <Row gutter={[16, 16]} justify="center">
            {data.are_reporting.map((s) => (
              <Col key={s.emp_id}>
                <PersonCard user={s} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {data.reporting_to.length === 0 && data.are_reporting.length === 0 && (
        <Text>You have no reporting hierarchy set.</Text>
      )}
    </div>
  );
};

export default Team;
