import { AxiosResponse } from "axios";
import Training from "../types/Training";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const getAllTrainingsByUserId = async (
  userId: number
): Promise<AxiosResponse<Training[]>> => {
  const url = `${endpoints.baseURL}${endpoints.training}/GetTrainingsByUserId/${userId}`;
  const response = await http.get<Training[]>(url);
  return response;
};

const getAllTrainings = async (): Promise<AxiosResponse<Training[]>> => {
  const url = `${endpoints.baseURL}${endpoints.training}`;
  const response = await http.get<Training[]>(url);
  return response;
};

const getTrainingById = async (
  id: number
): Promise<AxiosResponse<Training>> => {
  const url = `${endpoints.baseURL}${endpoints.training}/${id}`;
  const response = await http.get<Training>(url);
  return response;
};

const createTraining = async (
  name: string,
  userId: number
): Promise<AxiosResponse<Training>> => {
  return await http.post(`${endpoints.baseURL}${endpoints.training}`, {
    name,
    userId,
  });
};

const deleteTrainingById = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.training}/${id}`;
  const response = await http.delete(url);
  return response;
};

const trainingApi = {
  getAllTrainingsByUserId,
  getAllTrainings,
  getTrainingById,
  createTraining,
  deleteTrainingById,
};

export default trainingApi;
