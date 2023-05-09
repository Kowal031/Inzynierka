import { AxiosResponse } from "axios";
import Training from "../types/Training";
import endpoints from "./endpoints";
import http from "./httpCommon";

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
  shouldersInjury: number,
  chestInjury: number,
  backInjury: number,
  bicepsInjury: number,
  tricepsInjury: number,
  abdominalInjury: number,
  buttocksInjury: number,
  quadricepsInjury: number,
  hamstringsInjury: number,
  clavesInjury: number,
  userId: number,
): Promise<AxiosResponse<Training>> => {
  return await http.post(`${endpoints.baseURL}${endpoints.training}`, {
    name,
    shouldersInjury,
    chestInjury,
    backInjury,
    bicepsInjury,
    tricepsInjury,
    abdominalInjury,
    buttocksInjury,
    quadricepsInjury,
    hamstringsInjury,
    clavesInjury,
    userId,
  });
};

const deleteTrainingById = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.training}/${id}`;
  const response = await http.delete(url);
  return response;
};

const trainingApi = {
  getAllTrainings,
  getTrainingById,
  createTraining,
  deleteTrainingById,
};

export default trainingApi;
