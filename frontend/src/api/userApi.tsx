import axios from "axios";
import { baseURL } from "@/intercepter";

interface User {
  username: string;
  email: string;
  avatar: string;
  _id: string;
}

interface Data {
  user: User;
  accessToken: string;
}

export const loginUser = (data: any) =>
  axios
    .post<Data>(`${baseURL}/auth/login`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const signup = (data: any) =>
  axios
    .post<Data>(`${baseURL}/auth/register`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const search = (query: string) =>
  axios
    .get<User>(`${baseURL}/user/search?query=${query}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const updateUser = (userData: User) =>
  axios
    .put<User>(`${baseURL}/user/${userData._id}`, userData)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getDashboard = (token: string) =>
  axios
    .get(`${baseURL}/user/dashboerd`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
