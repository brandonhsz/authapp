import axios from 'axios';

const api = axios.create({
  baseURL: process.env.USERFRONT_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`,
  },
});

export default api;
