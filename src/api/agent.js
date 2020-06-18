import axios from "axios";

const instance = axios.create({
  baseURL: "https://mhr.sytes.net"
});

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token", "");
  config.headers.Authorization = token ? token : "";

  return config;
});

export default instance;
