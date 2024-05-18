import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Column } from "@/types/index";

export const axiosFetch: AxiosInstance = axios.create({
  baseURL: "https://kanaban-backend.onrender.com/api/test",
});

const getBoards = async () => {
  const response = await axiosFetch.get<Column>(``);
  return response.data;
};
