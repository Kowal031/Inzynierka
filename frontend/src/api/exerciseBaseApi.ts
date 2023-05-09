import { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import endpoints from "./endpoints";
import http from "./httpCommon";

const getAllExerciseBase = async (): Promise<AxiosResponse<ExerciseBase[]>> => {
  const url = `${endpoints.baseURL}${endpoints.exerciseBase}`;
  const response = await http.get<ExerciseBase[]>(url);
  return response;
};

const exerciseBaseApi = {
  getAllExerciseBase,
};

export default exerciseBaseApi;