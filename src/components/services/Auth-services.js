import API from "../API/API";
import Endpoints from "../API/endpoints";

class AuthService {
  static userLogin(user) {
    return API.post(Endpoints.api.auth.userLogin, user);
  }

  static validateToken() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return Promise.reject("Invalid token");
    return API.post(Endpoints.api.auth.validateToken, { token });
  }

  static refreshToken() {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) return Promise.reject("Token not available");
    return API.post(Endpoints.api.auth.refreshToken, {
      refreshToken,
      accessToken,
    });
  }
}

export default AuthService;
