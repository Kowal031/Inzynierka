import axios, { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import endpoints from "./endpoints";
import http from "./httpCommon";

// Function to get all exercise bases
const getAllExerciseBase = async (): Promise<AxiosResponse<ExerciseBase[]>> => {
  const url = `${endpoints.baseURL}${endpoints.exerciseBase}`;
  const response = await http.get<ExerciseBase[]>(url);
  return response;
};

// API object with all functions
const exerciseBaseApi = {
  getAllExerciseBase,
};

export default exerciseBaseApi;