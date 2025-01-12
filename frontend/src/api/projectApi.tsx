import { baseURL } from "@/interceptor";
import axios from "axios";

export const createProject = (data: any, token: string) => {
  return axios
    .post(`${baseURL}/project`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getUserProjects = (token: string) =>
  axios
    .get(`${baseURL}/project`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getProject = (token: string, projectId: string) =>
  axios
    .get(`${baseURL}/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
