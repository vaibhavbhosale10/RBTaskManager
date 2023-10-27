import API from "../API/API";
import Endpoints from "../API/endpoints";

class AdminTaskService {
  static createAdmintask(task) {
    return API.post(Endpoints?.api?.admintask?.create, task);
  } //createUser

  static updateAdminTask(id, task) {
    return API.put(Endpoints?.api?.admintask?.update + id, task);
  } //updateUser

  static deleteadminTask(id) {
    return API.delete(Endpoints?.api?.admintask?.delete + id);
  } //deleteUser

  static fetchOneAdminTask(id) {
    return API.get(Endpoints?.api?.admintask?.getOne + id);
  } //fetchOneUser

  static fetchAllAdmintask(query = "") {
    return API.get(Endpoints?.api?.admintask?.getAll + query);
  } //fetchAllUser
}

export default AdminTaskService;
