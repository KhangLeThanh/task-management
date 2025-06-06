import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { Task } from "@/ultils/types";

export const getTask = async (userId: string | undefined, status?: string) => {
  try {
    const response = await axios.get(`${APIURL}/tasks/${userId}/task`, {
      withCredentials: true,
      params: status ? { status } : {},
    });
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const createTask = async ({
  userId,
  personalTask,
}: {
  userId: string | null;
  personalTask: Task;
}) => {
  try {
    const response = await axios.post(
      `${APIURL}/tasks/${userId}/task`,
      personalTask,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const updateTask = async ({
  userId,
  taskId,
  personalTask,
}: {
  userId: string | null;
  personalTask: Task;
  taskId: string;
}) => {
  try {
    const response = await axios.patch(
      `${APIURL}/tasks/${userId}/task/${taskId}`,
      personalTask,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};
