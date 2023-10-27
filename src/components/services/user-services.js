import API from "../API/API";
import Endpoints from "../API/endpoints";

class UserService {
  static createUser(user) {
    return API.post(Endpoints?.api?.users?.create, user);
  } //createUser

  static updateUser(id, user) {
    return API.put(Endpoints?.api?.users?.update + id, user);
  } //updateUser

  static deleteUser(id) {
    return API.delete(Endpoints?.api?.users?.delete + id);
  } //deleteUser

  static fetchOneUser(id) {
    return API.get(Endpoints?.api?.users?.getOne + id);
  } //fetchOneUser

  static fetchAllUser(query = "") {
    return API.get(Endpoints?.api?.users?.getAll + query);
  } //fetchAllUser
}

export default UserService;
