import axios from "axios";
import Cookies from "js-cookie";

export const baseApi = `http://161.97.166.219:8989/api/v1/`;

export const AxiosInstance = axios.create({
  baseURL: baseApi,
  headers: {
    Authorization: `Bearer ${Cookies.get("access-token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
