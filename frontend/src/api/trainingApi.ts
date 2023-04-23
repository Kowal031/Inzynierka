import axios, { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import Training from "../types/Training";
import endpoints from "./eindpoints";

const getAll = async (): Promise<AxiosResponse<Training[]>> => {
  return await axios.get<Training[]>(
    `${endpoints.baseURL}${endpoints.training}`
  );
};

const getTraining = async (id: number): Promise<AxiosResponse<Training>> => {
  return await axios.get<Training>(
    `${endpoints.baseURL}${endpoints.training}/${id}`
  );
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
  clavesInjury: number
): Promise<AxiosResponse<Training>> => {
  return await axios.post(`${endpoints.baseURL}${endpoints.training}`, {
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
    clavesInjury
  });
};

const deleteTraining = async (id: number): Promise<AxiosResponse<void>> => {
  return await axios.delete(`${endpoints.baseURL}${endpoints.training}/${id}`);
}

const trainingApi = {
  getAll,
  getTraining,
  createTraining,
  deleteTraining
};

export default trainingApi;
