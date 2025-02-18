import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "../baseUrl";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<boolean> => {
  try {
    let response = await axios.post(`${baseURL}auth/authenticate`, data);

    // Store the token and user data in cookies
    Cookies.set("access-token", response.data.token);
    Cookies.set("user", JSON.stringify(response.data));

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
