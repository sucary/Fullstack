import axios from 'axios';
import { DiaryEntry, NewEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}



export const createEntry = async (object: NewEntry) => {
  try {
    const response = await axios
    .post<DiaryEntry>(baseUrl, object);
  return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("An unexpected axios error has orrured: ", error.status);
      console.error(error.response);
    } else {
    console.error("Non-axios error has occured: ", error);
    }
  }
}
