import axios, { AxiosResponse } from "axios";
import Exercise from "../types/Exercise";
import endpoints from "./eindpoints";

const getExerciseByTrainingId= async (id: number): Promise<AxiosResponse<Exercise[]>> => {
  return await axios.get<Exercise[]>(
    `${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`
  );
};



const addExercise = async (
  idTraining: number,
  name: string,
  idExerciseBase: number,
  numberOfSeries: number,
): Promise<AxiosResponse<Exercise>> => {
  return await axios.post(`${endpoints.baseURL}${endpoints.exercise}`, {
    idTraining,
    name,
    idExerciseBase,
    numberOfSeries
  });
};
const deleteExercise = async (id: number): Promise<AxiosResponse<void>> => {
  return await axios.delete(`${endpoints.baseURL}${endpoints.exercise}/${id}`);
}
const deleteExercises = async (id: number): Promise<AxiosResponse<void>> => {
  return await axios.delete(`${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`);
}

const exerciseApi = {
  getExerciseByTrainingId,
  addExercise,
  deleteExercise,
  deleteExercises
};

export default exerciseApi;
