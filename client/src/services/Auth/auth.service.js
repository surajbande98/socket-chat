import httpService from "../../shared/services/http.service";
import configurationService from "../../shared/services/configuration.service";

export default class AuthService {
  static login(data) {
    let url = configurationService.loginUrl;
    return httpService.post(url, data);
  }

  static registerUser(data) {
    let url = configurationService.signupUrl;
    return httpService.put(url, data);
  }

  static createUserPosts(data) {
    let url = "http://localhost:4001/api/createPost";
    return httpService
      .save(url, data)
      .then(res => {
        return res.data;
      })
      .catch(err => err);
  }

  static updateUserPosts(data, postId) {
    let url = `http://localhost:4001/api/updatepost/${postId}`;
    return httpService
      .save(url, data)
      .then(res => {
        return res.data;
      })
      .catch(err => err);
  }

  static getUserPosts() {
    let url = "http://localhost:4001/api/userpost";
    return httpService
      .fetch(url)
      .then(res => {
        return res.data;
      })
      .catch(err => err);
  }

  static deleteUserPosts(postId) {
    let url = `http://localhost:4001/api/deletepost/${postId}`;
    return httpService
      .fetch(url)
      .then(res => {
        return res.data;
      })
      .catch(err => err);
  }
}
