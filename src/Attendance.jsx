import React, { useEffect, useState } from 'react';
import { Button, Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Attendance = () => {
  const empId = localStorage.getItem('emp_id');
  const checkInKey = `checkin_${empId}`;
  const summaryKey = `summary_${empId}`;

  const [checkInTime, setCheckInTime] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const savedCheckIn = localStorage.getItem(checkInKey);
    const savedSummary = localStorage.getItem(summaryKey);

    if (savedCheckIn) setCheckInTime(new Date(savedCheckIn));
    if (savedSummary) setSummary(JSON.parse(savedSummary));
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    localStorage.setItem(checkInKey, now.toISOString());
    setCheckInTime(now);
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;

    const now = new Date();
    const diff = now - checkInTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    const result = {
      date: now.toLocaleDateString(),
      duration: `${hours}h ${minutes}m`,
    };

    localStorage.removeItem(checkInKey);
    localStorage.setItem(summaryKey, JSON.stringify(result));
    setCheckInTime(null);
    setSummary(result);
  };

  return (
    <Card style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <Title level={3}>Attendance</Title>

      <Button type="primary" onClick={handleCheckIn} disabled={!!checkInTime} style={{ marginRight: 10 }}>
        Check In
      </Button>
      <Button danger onClick={handleCheckOut} disabled={!checkInTime}>
        Check Out
      </Button>

      {summary && (
        <Paragraph style={{ marginTop: 20 }}>
          <strong>Date:</strong> {summary.date} <br />
          <strong>Worked:</strong> {summary.duration}
        </Paragraph>
      )}

      {checkInTime && (
        <Paragraph style={{ marginTop: 10 }}>
          Checked in at: <strong>{checkInTime.toLocaleTimeString()}</strong>
        </Paragraph>
      )}
    </Card>
  );
};

export default Attendance;
