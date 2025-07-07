import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, message } from 'antd';
import { getUserProfile } from '../services/profileload';
import { Descriptions } from 'antd';



const { Title, Paragraph } = Typography;

const Profile = () => {

  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  const emp_id = localStorage.getItem('emp_id'); 
  console.log('emp_id in Profile:', emp_id);

  useEffect(() => {
    if (!emp_id) {
      message.error('No emp_id in localStorage');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        console.log('GET', `/api/profile/${emp_id}`);
        const data = await getUserProfile(emp_id);
        console.log('Profile data:', data);
        setUser(data);
      } catch (err) {
        console.error(err);
        message.error(err.error || 'Fetch error');
      } finally {
        setLoading(false);
      }
    })();
  }, [emp_id]);

  if (loading) return <Spin style={{ marginTop: 80 }} />;
  if (!user)   return <Paragraph>No profile found.</Paragraph>;

  return (
    <Card variant="borderless" style={{ maxWidth: 800 }}>
      <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
        <i>WELCOME {user.username.toUpperCase() || user.nameto.UpperCase()}</i>
      </Title>

      

<Descriptions title="Profile" bordered column={1}>
  <Descriptions.Item label="Name">{user.username || user.name}</Descriptions.Item>
  <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
  <Descriptions.Item label="Department">{user.dept}</Descriptions.Item>
  <Descriptions.Item label="Email">{user.mail}</Descriptions.Item>
  <Descriptions.Item label="Phone">{user.phn_num}</Descriptions.Item>
</Descriptions>


    </Card>
  );
};

export default Profile;
