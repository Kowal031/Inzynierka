import axios, { AxiosResponse } from "axios";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";
import endpoints from "./endpoints";
import http from "./httpCommon";

// Function to get all exercise bases
const getHistory = async (): Promise<AxiosResponse<HistoryOfWorkouts[]>> => {
  const url = `${endpoints.baseURL}${endpoints.history}`;
  const response = await http.get<HistoryOfWorkouts[]>(url);
  return response;
};

// API object with all functions
const historyApi = {
    getHistory,
};

export default historyApi;