import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  BoardName,
  BoardSchemaType,
  ColumnSchemaType,
} from "@/types/SharedTypes";

export const axiosFetch: AxiosInstance = axios.create({
  baseURL: "https://kanaban-backend.onrender.com/api",
});

const getBoardNames = async (userId: string) => {
  const response = await axiosFetch.get<BoardName[]>(`/board-names/${userId}`);
  return response.data;
};

const getBoards = async (userId: string) => {
  const response = await axiosFetch.get(`/board/${userId}`);
  return response.data;
};

const findeBoard = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get(`/board/${userId}/${boardId}`);
  return response.data;
};

const getColumns = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get(`/column/${userId}/${boardId}`);
  return response.data;
};

const deleteBoard = async (userId: string, boardId: string) => {
  const response = await axiosFetch.delete(`/board/${userId}/${boardId}`);
  return response.data;
};

const getTasks = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get(`/column/${userId}/${boardId}`);
  return response.data;
};

const deleteTask = async (userId: string, boardId: string) => {
  const response = await axiosFetch.delete(`/task/${userId}/${boardId}`);
  return response.data;
};

const postBoard = async (
  userId: string,
  boardName: string,
  columns?: { color: string; column_name: string }[],
) => {
  const body = { columns, board_name: boardName };

  try {
    const response = await axiosFetch.post<{
      data: { newBoard: BoardSchemaType };
    }>(`/board/${userId}`, body);

    return response?.data;
  } catch (error) {
    console.error("There was an error making the POST request:", error);
  }
};

const api = {
  getBoardNames,
  postBoard,
  getBoards,
  findeBoard,
  getColumns,
  deleteBoard,
  deleteTask,
  getTasks,
};

export default api;
