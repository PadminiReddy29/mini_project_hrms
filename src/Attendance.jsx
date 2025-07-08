import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Spin } from 'antd';
import { checkIn, checkOut, getStatus } from './services/attendance';

const { Title, Paragraph } = Typography;

const Attendance = () => {
  const emp_id = localStorage.getItem('emp_id');
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getStatus(emp_id);
        if (data.checkIn) setCheckInTime(new Date(data.checkIn));
        if (data.checkOut) setCheckOutTime(new Date(data.checkOut));
        if (data.hoursWorked) setHoursWorked(data.hoursWorked);
      } catch (err) {
        message.error(err.message || 'Failed to load status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [emp_id]);

  const handleCheckIn = async () => {
    try {
      const data = await checkIn(emp_id);
      message.success(data.message);
      setCheckInTime(new Date(data.checkIn));
    } catch (err) {
      message.error(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      const data = await checkOut(emp_id);
      message.success(data.message);
      setCheckOutTime(new Date(data.checkOut));
      setHoursWorked(data.hoursWorked);
    } catch (err) {
      message.error(err.response?.data?.message || 'Check-out failed');
    }
  };

  if (loading) return <Spin style={{ display: 'block', margin: '80px auto' }} />;

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <Title level={3}>Attendance</Title>

      <Button type="primary" onClick={handleCheckIn} disabled={!!checkInTime} style={{ marginRight: 12 }}>
        Check In
      </Button>
      <Button type="primary" danger onClick={handleCheckOut} disabled={!checkInTime || !!checkOutTime}>
        Check Out
      </Button>

      {checkInTime && (
        <Paragraph style={{ marginTop: 20 }}>
          <strong>Checked in at:</strong> {checkInTime.toLocaleTimeString()}
        </Paragraph>
      )}

      {checkOutTime && (
        <>
          <Paragraph>
            <strong>Checked out at:</strong> {checkOutTime.toLocaleTimeString()}
          </Paragraph>
          <Paragraph>
            <strong>Hours Worked:</strong> {hoursWorked} hours
          </Paragraph>
        </>
      )}
    </div>
  );
};

export default Attendance;
