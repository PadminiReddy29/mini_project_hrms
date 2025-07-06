import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // adjust as needed

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/update-password`, {
      mail: email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to reset password' };
  }
};
