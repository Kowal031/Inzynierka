import axios, { AxiosResponse } from "axios";
import User from "../types/User";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const register = async (
  email: string,
  password: string
): Promise<AxiosResponse<User>> => {
  const url = `${endpoints.baseURL}${endpoints.register}`;
  const data = { email, password };
  const response = await axios.post(url, data);
  return response;
};

const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<User>> => {
  const url = `${endpoints.baseURL}${endpoints.login}`;

  const data = { email, password };
  const response = await http.post(url, data);
  localStorage.setItem("token", response.data.token);
  return response;
};

const usersApi = { login, register };

export default usersApi;
