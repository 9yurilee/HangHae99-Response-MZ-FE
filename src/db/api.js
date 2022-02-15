import axios from "axios";

export const api_post = axios.create({
    baseURL: "http://localhost:3001/articles",
    headers: {
        accept: "application/json;charset=UTF-8",
        "content-type": "application/json"
    }
})