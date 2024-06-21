import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  BoardName,
  BoardSchemaType,
  TaskSchemaType,
  ColumnNames,
  TaskData,
} from "@/types/SharedTypes";

export const axiosFetch: AxiosInstance = axios.create({
  baseURL: "https://kanaban-backend.onrender.com/api",
});

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

const getBoards = async (userId: string) => {
  const response = await axiosFetch.get(`/board/${userId}`);
  return response.data;
};

const findeBoard = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get(`/board/${userId}/${boardId}`);
  return response.data;
};

const getBoardNames = async (userId: string) => {
  const response = await axiosFetch.get<BoardName[]>(`/board-names/${userId}`);
  return response.data;
};

const deleteBoard = async (userId: string, boardId: string) => {
  const response = await axiosFetch.delete(`/board/${userId}/${boardId}`);
  return response.data;
};

const getColumns = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get(`/column/${userId}/${boardId}`);
  return response.data;
};

const getColumnNames = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get<ColumnNames[]>(
    `/column-names/${userId}/${boardId}`,
  );
  return response?.data;
};

const postTask = async (
  userId: string,
  body: {
    title: string;
    description: string;
    current_status: string;
    parent_board_id: string;
    subtasks?: string[];
  },
) => {
  try {
    const response = await axiosFetch.post<{
      data: { newTaks: TaskSchemaType };
    }>(`/task/${userId}`, body);

    return response?.data;
  } catch (error) {
    console.error("There was an error making the POST request:", error);
  }
};

const editTask = async (
  userId: string,
  taskId: string,
  body: {
    title: string;
    description: string;
    current_status: string;
    parent_board_id: string;
    subtasks?: string[];
  },
) => {
  try {
    const response = await axiosFetch.put<{
      data: { newTaks: TaskSchemaType };
    }>(`/task/${userId}/${taskId}`, body);

    return response?.data;
  } catch (error) {
    console.error("There was an error editing the POST request:", error);
  }
};

const getTasks = async (userId: string, boardId: string) => {
  const response = await axiosFetch.get<TaskData[]>(
    `/task/${userId}/${boardId}`,
  );
  return response.data;
};

const getTask = async (userId: string, boardId: string, taskId: string) => {
  const response = await axiosFetch.get<TaskData>(
    `/task/${userId}/${boardId}/${taskId}`,
  );
  return response.data;
};

const deleteTask = async (userId: string, boardId: string) => {
  const response = await axiosFetch.delete(`/task/${userId}/${boardId}`);
  return response.data;
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
  postTask,
  getColumnNames,
  getTask,
  editTask,
};

export default api;
