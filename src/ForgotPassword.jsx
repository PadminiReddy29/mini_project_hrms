import React, { useState } from 'react';
import { Button, Form, Modal, message } from 'antd';
import TextInput from './components/TextInput';
import { useNavigate } from 'react-router-dom';
import { sendOtpToEmail } from './services/forgotpswd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const navigate = useNavigate();

  const OTP = '0000';

  const handleSendOTP = async () => {
    if (!email) {
      message.error('Please enter your email.');
      return;
    }

    try {
      const data = await sendOtpToEmail(email);
      message.success(data.message || 'OTP sent successfully!');
      setOtpVisible(true);
    } catch (err) {
      message.error(err.error || 'Failed to send OTP.');
    }
  };

  const handleVerifyOTP = () => {
    if (otp === OTP) {
      message.success('OTP verified successfully!');
      setOtpVisible(false);
      navigate('/reset-pswd', {state: {email}});
    } else {
      message.error('Invalid OTP. Try again.');
    }
  };

  return (
    <Form style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Forgot Password</h2>

      <TextInput
        label="Email"
        name="email"
        placeholder="Enter your registered email"
        onChange={(e) => setEmail(e.target.value)}
        rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email address' },
          ]}
      />

      <Button type="primary" block onClick={handleSendOTP}>
        Send OTP
      </Button>

      <Modal
        title="Enter OTP"
        open={otpVisible}
        onOk={handleVerifyOTP}
        onCancel={() => setOtpVisible(false)}
        okText="Verify OTP"
      >
        <TextInput
          label="OTP"
          name="otp"
          placeholder="Enter the OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </Form>
  );
};

export default ForgotPassword;
