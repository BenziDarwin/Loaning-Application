import Cookies from "js-cookie";
import { AxiosInstance } from "../baseUrl";

export const login = async (data: any) => {
  try {
    let response = await AxiosInstance.post("auth/authenticate", data);

    // Store the token and user data in cookies
    Cookies.set("access-token", response.data.token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", JSON.stringify(response.data), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
