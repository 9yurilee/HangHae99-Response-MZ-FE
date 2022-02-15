import axios from "axios";

export const api_post = axios.create({
    baseURL: "http://54.180.137.157",
    headers: {
        accept: "application/json;charset=UTF-8",
        "content-type": "application/json"
    }
});