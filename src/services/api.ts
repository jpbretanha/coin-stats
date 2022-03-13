import axios from "axios";

export const API_URL = "https://api.coinstats.app/public/v1";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
