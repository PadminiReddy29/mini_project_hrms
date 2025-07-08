import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/attendance';

export const checkIn = async (emp_id) => {
  const res = await axios.post(`${BASE_URL}/checkin`, { emp_id });
  return res.data;
};

export const checkOut = async (emp_id) => {
  const res = await axios.post(`${BASE_URL}/checkout`, { emp_id });
  return res.data;
};

export const getStatus = async (emp_id) => {
  const res = await axios.get(`${BASE_URL}/status/${emp_id}`);
  return res.data;
};
