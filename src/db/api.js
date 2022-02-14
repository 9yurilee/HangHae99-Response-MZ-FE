import axios from "axios";

export const api_post = axios.get({
  baseURL: "http://localhost:3001/articles",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});