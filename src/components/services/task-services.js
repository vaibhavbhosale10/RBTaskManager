import API from "../API/API";
import endpoints from "../API/endpoints";

class taskServices {
  static createTask(task, emailId, email) {
    return API.post(endpoints?.api?.tasks?.create + `?email=${emailId}`, task);
  }

  static updateTask(id, task) {
    return API.put(endpoints?.api?.tasks.update + id, task);
  } //updateContact

  static deleteTask(id) {
    return API.delete(endpoints?.api?.tasks.delete + id);
  } //deleteContact

  static fetchOneTask(id) {
    return API.get(endpoints?.api?.tasks.getOne + id);
  } //fetchOneContact

  static fetchAllTask(query = "") {
    return API.get(endpoints?.api?.tasks.getAll + query);
  } //fetchAllContact
}
export default taskServices;
