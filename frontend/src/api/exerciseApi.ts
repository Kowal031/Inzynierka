import axios, { AxiosResponse } from "axios";
import EditExercise from "../types/EditExercise";
import Exercise from "../types/Exercise";
import endpoints from "./endpoints";

// Function to get exercises by training ID
const getExerciseByTrainingId = async (id: number): Promise<AxiosResponse<Exercise[]>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`;
  const response = await axios.get<Exercise[]>(url);
  return response;
};

// Function to add an exercise
const addExercise = async (
  idTraining: number,
  name: string,
  idExerciseBase: number,
  numberOfSeries: number
): Promise<AxiosResponse<Exercise>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}`;
  const data = { idTraining, name, idExerciseBase, numberOfSeries };
  const response = await axios.post<Exercise>(url, data);
  return response;
};

// Function to delete an exercise
const deleteExercise = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}/${id}`;
  const response = await axios.delete(url);
  return response;
};

// Function to delete exercises by training ID
const deleteExercises = async (id: number): Promise<AxiosResponse<void>> => {
  const url = `${endpoints.baseURL}${endpoints.exercise}${endpoints.byTrainingId}/${id}`;
  const response = await axios.delete(url);
  return response;
};



const updateExercise = async (editExerciseDtos: EditExercise[]) => {
  try {
    const response = await axios.put(`${endpoints.baseURL}${endpoints.exercise}`, editExerciseDtos);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// API object with all functions
const exerciseApi = {
  getExerciseByTrainingId,
  addExercise,
  deleteExercise,
  deleteExercises,
  updateExercise
};

export default exerciseApi;