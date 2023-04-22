import axios, { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import Training from "../types/Training";
import endpoints from "./eindpoints";

const getAll = async (): Promise<AxiosResponse<Training[]>> => {
  return await axios.get<Training[]>(
    `${endpoints.baseURL}${endpoints.training}`
  );
};

const getAllExerciseBase = async (): Promise<AxiosResponse<ExerciseBase[]>> => {
  return await axios.get<ExerciseBase[]>(
    `${endpoints.baseURL}${endpoints.exerciseBase}`
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

const trainingApi = {
  getAll,
  getAllExerciseBase,
  createTraining
};

export default trainingApi;
