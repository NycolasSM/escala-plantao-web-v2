import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3005',
  baseURL: 'https://apiescalas.localsig.com',
});

export const apiPhp = axios.create({
  baseURL: "https://localsig.com",
});