import axios from "axios";
import { baseURL } from "@/intercepter";
import { Task } from "@/schema";
export const createTask = (data: any, token: String) =>
  axios
    .post(`${baseURL}/task`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getPorjectTasks = (projectId: string, token: string) =>
  axios
    .get(`${baseURL}/task/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const getUserTasks = (token: string) =>
  axios
    .get(`${baseURL}/user/task`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const updateTask = (data: Task, token: string) =>
  axios
    .put(`${baseURL}/task/${data.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const deleteTask = (taskId: string, token: string) =>
  axios
    .delete(`${baseURL}/task/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
