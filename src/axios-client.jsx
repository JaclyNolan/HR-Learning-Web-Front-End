import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:80/api`
const axiosClient = axios.create({
  baseURL: apiUrl
})

console.log(import.meta.env.VITE_API_URL);

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  const urlWithParams = config.method.toUpperCase().concat(` ${config.url}`, (config.params ? `?${new URLSearchParams(config.params).toString()}` : ''));
  console.log('Request URL:', urlWithParams);
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status === 401) window.location.replace('/login')
  // if (error.response.status === 404) window.location.replace('/404')
  console.log(error);
  throw error;
})

export default axiosClient
