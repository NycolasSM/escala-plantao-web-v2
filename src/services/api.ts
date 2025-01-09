import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://apiescalas.localsig.com',
});

export const apiPhp = axios.create({
  baseURL: "https://localsig.com",
});