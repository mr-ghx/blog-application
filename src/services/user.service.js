import http from "../http_common";

class UserDataService {
  getUser(name, email) {
    const data = {
      name: name,
      email: email,
    };
    return http.post("/user/add", data);
  }

  updatePremium(id) {
    const data = {
      id: id,
    };
    return http.patch("/user/update-subscription", data);
  }
}

export default new UserDataService();
