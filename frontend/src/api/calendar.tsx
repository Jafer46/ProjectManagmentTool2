import { baseURL } from "@/interceptor";
import axios from "axios";

export const getCalendar = (date: any) =>
  axios
    .post(`${baseURL}/calendar/`, { date })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
