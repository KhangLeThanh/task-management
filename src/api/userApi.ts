import axios from "axios";
import { APIURL } from "../constant/baseUrl";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${APIURL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const updateUser = async ({
  id,
  userStatus,
}: {
  id: string;
  userStatus: boolean;
}) => {
  try {
    const response = await axios.patch(
      `${APIURL}/users/${id}`,
      { status: userStatus },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${APIURL}/users/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log("test error", error);
  }
};
