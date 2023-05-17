import { AxiosResponse } from "axios";
import EditExercise from "../types/EditExercise";
import Exercise from "../types/Exercise";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const getExerciseByTrainingId = async (
  id: number
): Promise<AxiosResponse<Exercise[]>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`;
  const response = await http.get<Exercise[]>(url);
  return response;
};

const addExercise = async (
  idTraining: number,
  name: string,
  idExerciseBase: number,
  numberOfSeries: number
): Promise<AxiosResponse<Exercise>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}`;
  const data = { idTraining, name, idExerciseBase, numberOfSeries };
  const response = await http.post<Exercise>(url, data);
  return response;
};

const deleteExercise = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}/${id}`;
  const response = await http.delete(url);
  return response;
};

const deleteExercises = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`;
  const response = await http.delete(url);
  return response;
};

const updateExercise = async (
  editExerciseDtos: EditExercise[]
): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}`;
  const response = await http.put(url, editExerciseDtos);
  return response;
};

const exerciseApi = {
  getExerciseByTrainingId,
  addExercise,
  deleteExercise,
  deleteExercises,
  updateExercise,
};

export default exerciseApi;
