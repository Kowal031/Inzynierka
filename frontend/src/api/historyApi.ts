import { AxiosResponse } from "axios";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";
import endpoints from "./common/endpoints";
import http from "./common/httpCommon";

const getHistory = async (userId: number): Promise<AxiosResponse<HistoryOfWorkouts[]>> => {
  const url = `${endpoints.baseURL}${endpoints.history}/${userId}`;
  const response = await http.get<HistoryOfWorkouts[]>(url);
  return response;
};

const historyApi = {
    getHistory,
};

export default historyApi;