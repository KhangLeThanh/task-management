import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { TaskResponse } from "@/ultils/types";

export const getTask = async (status?: string, assignedTo?: string) => {
  try {
    const response = await axios.get(`${APIURL}/tasks`, {
      withCredentials: true,
      params: {
        ...(status && { status }),
        ...(assignedTo && { assignedTo }),
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const createTask = async ({
  personalTask,
}: {
  personalTask: TaskResponse;
}) => {
  try {
    const response = await axios.post(`${APIURL}/tasks`, personalTask, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const updateTask = async ({
  taskId,
  personalTask,
}: {
  personalTask: TaskResponse;
  taskId: string;
}) => {
  try {
    const response = await axios.patch(
      `${APIURL}/tasks/${taskId}`,
      personalTask,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};
