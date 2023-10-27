import API from "../API/API";
import Endpoints from "../API/endpoints";

class AdminService {
  static adminLogin(admin) {
    return API.post(Endpoints?.api?.auth.adminLogin, admin);
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

export default AdminService;
