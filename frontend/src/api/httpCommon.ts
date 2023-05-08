import axios from "axios";
import { getToken } from "../utils/Token";

const http = axios.create({
  baseURL: "",
  headers: {},
});

http.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token === null) {
      return config;
    }

    config.headers = Object.assign({}, config.headers, {
      Authorization: `Bearer ${token}`,
    });

    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default http;
