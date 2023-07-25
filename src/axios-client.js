import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:80/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  const urlWithParams = `${config.url}?${new URLSearchParams(config.params).toString()}`;
  console.log('Request URL with Params:', urlWithParams);
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
