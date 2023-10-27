import axios from "axios";
import endpoints from "./endpoints";
import AuthService from "../services/Auth-services";
const API = axios.create({
  baseURL: `${endpoints.severBaseUrl}/api`,
});
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) req.headers["authorization"] = token;

  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("Response: ", err);
    console.log("Response code: ", err?.response?.status);

    if (
      err?.response?.status == 403 &&
      sessionStorage.getItem("refreshToken")
    ) {
      // accessToken is expired or invalid
      const response = await AuthService.refreshToken();

      if (response.data?.data) {
        const { atoken, rtoken } = response.data.data;
        sessionStorage.setItem("accessToken", atoken);
        sessionStorage.setItem("refreshToken", rtoken);
        return Promise.resolve();
      } else {
        Promise.reject(err);
      }
    } else if (err?.response?.status == 406) {
      // refreshToken is expired
      sessionStorage.clear();
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default API;
