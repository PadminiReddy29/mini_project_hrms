// src/services/loginService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // backend server

export const loginUser = async (mail, pswd) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      mail,
      pswd,
    });
    return response.data; // { message, user }
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};
