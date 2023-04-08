import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
    .then((response) => response.data);
};

export const addEntry = (entry: NewDiaryEntry) => {
  return axios
    .post("http://localhost:3001/api/diaries/", entry)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        console.error("myerror_2", error);
      }
    });
};
