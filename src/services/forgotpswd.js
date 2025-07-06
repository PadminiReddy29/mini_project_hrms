import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // backend server

export const sendOtpToEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/forgot-password`, { mail: email });
    return response.data; // Expecting { message: 'OTP sent successfully' }
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send OTP' };
  }
};