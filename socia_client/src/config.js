import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://amar-meta-social.herokuapp.com/api/",
});
