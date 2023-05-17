import { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const getAllExerciseBase = async (): Promise<AxiosResponse<ExerciseBase[]>> => {
  const url = `${endpoints.baseURL}${endpoints.exerciseBase}`;
  const response = await http.get<ExerciseBase[]>(url);
  return response;
};

const exerciseBaseApi = {
  getAllExerciseBase,
};

export default exerciseBaseApi;