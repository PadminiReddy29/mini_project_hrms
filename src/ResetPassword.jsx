import React, { useState, useEffect } from 'react';
import { Button, message, Form, Typography } from 'antd';
import TextInput from './components/TextInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from './services/resetpswd';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const passedEmail = location.state?.email;
    if (passedEmail) {
      setEmail(passedEmail);
    } else {
      message.error('No email found. Redirecting...');
      navigate('/forgot-pswd');
    }
  }, [location, navigate]);

  const handleReset = async () => {
    console.log("Reset button clicked");
    if (!newPassword) {
      message.error('Please enter a new password.');
      return;
    }

    try {
      const data = await resetPassword(email, newPassword);
      message.success(data.message || 'Password updated successfully!');
      navigate('/login');
    } catch (error) {
      message.error(error.error || 'Password update failed.');
    }
  };

  return (
    <Form style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Set new password for <Typography.Text type="secondary">{email}</Typography.Text>
      </Typography.Title>

      <TextInput
        label="New Password"
        name="newPassword"
        placeholder="Enter new password"
        password
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Button type="primary" block onClick={handleReset}>
        Confirm
      </Button>
    </Form>
  );
}

export default ResetPassword;
