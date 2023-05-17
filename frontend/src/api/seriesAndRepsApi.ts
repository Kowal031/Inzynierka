import { AxiosResponse } from "axios";
import SeriesAndReps from "../types/SeriesAndReps";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const getSeriesAndWeight = async (
  id: number
): Promise<AxiosResponse<SeriesAndReps>> => {
  const url = `${endpoints.baseURL}${endpoints.seriesaAndReps}/${id}`;
  const response = await http.get<SeriesAndReps>(url);
  return response;
};

const getSeriesAndWeightByExerciseId = async (id: number): Promise<AxiosResponse<SeriesAndReps[]>> => {
  const url = `${endpoints.baseURL}${endpoints.seriesaAndReps}${endpoints.byExerciseId}/${id}`;
  const response = await http.get<SeriesAndReps[]>(url);
  return response;
};

const addSeriesAndWeight = async (
  idExercise: number,
  seriesNumber: number,
  reps: number,
  weight: number
): Promise<AxiosResponse<SeriesAndReps>> => {
  const url = `${endpoints.baseURL}${endpoints.seriesaAndReps}`;
  const data = { idExercise, seriesNumber, reps, weight };
  const response = await http.post<SeriesAndReps>(url, data);
  return response;
};

const updateSeriesAndWeight = async (seriesAndReps: SeriesAndReps[]) => {
  try {
    const response = await http.put(`${endpoints.baseURL}${endpoints.seriesaAndReps}`, seriesAndReps);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const seriesAndRepsApi = {
  getSeriesAndWeight,
  getSeriesAndWeightByExerciseId,
  addSeriesAndWeight,
  updateSeriesAndWeight
};

export default seriesAndRepsApi;
