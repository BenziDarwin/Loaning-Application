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
    Cookies.set("access-token", response.data.token, {
      httpOnly: true, // Makes cookie inaccessible to client-side JS
      //secure: true,   // Cookie only sent over HTTPS
      sameSite: "lax", // Controls how cookie is sent with cross-site requests
      path: "/", // Cookie available for entire site
    });
    Cookies.set("user", JSON.stringify(response.data), {
      httpOnly: true, // Makes cookie inaccessible to client-side JS
      //secure: true,   // Cookie only sent over HTTPS
      sameSite: "lax", // Controls how cookie is sent with cross-site requests
      path: "/", // Cookie available for entire site
    });

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
