import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Adjust if backend is deployed
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
