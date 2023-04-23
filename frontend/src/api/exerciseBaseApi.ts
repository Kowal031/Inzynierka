import axios, { AxiosResponse } from "axios";
import ExerciseBase from "../types/ExerciseBase";
import endpoints from "./eindpoints";

const getAllExerciseBase = async (): Promise<AxiosResponse<ExerciseBase[]>> => {
    return await axios.get<ExerciseBase[]>(
      `${endpoints.baseURL}${endpoints.exerciseBase}`
    );
  };


  const exerciseBaseApi = {
    getAllExerciseBase,
  };
   
  export default exerciseBaseApi;