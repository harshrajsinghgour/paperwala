import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTests = async () => {
  try {
    const res = await api.get('/tests');
    return res.data;
  } catch (err) {
    console.error("Error fetching tests:", err);
    return [];
  }
};

export const fetchCurrentAffairs = async () => {
  try {
    const res = await api.get('/current-affairs');
    return res.data;
  } catch (err) {
    console.error("Error fetching current affairs:", err);
    return [];
  }
};

export const fetchJobAlerts = async () => {
  try {
    const res = await api.get('/jobs');
    return res.data;
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
};

export default api;
