// src/services/teamService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';   // change if your backend port differs

/** Fetch the full hierarchy for one employee */
export const getTeamHierarchy = async (empId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/teams/${empId}`);
    return data;                 // { emp_id, username, reporting_to: [], are_reporting: [] }
  } catch (error) {
    throw error.response?.data || { error: 'Failed to load team' };
  }
};
