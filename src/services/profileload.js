import axios from 'axios';
 
const BASE_URL = 'http://localhost:3001'; // Update if your backend is on another port
 
export const getUserProfile = async (emp_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/profile/${emp_id}`);
    return response.data; // assuming the API returns user details directly
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch profile' };
  }
};