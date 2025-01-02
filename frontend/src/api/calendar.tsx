import { baseURL } from "@/intercepter";
import axios from "axios";

export const getCalendar = (date: any) =>
  axios
    .get(`${baseURL}/calendar/${date}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
