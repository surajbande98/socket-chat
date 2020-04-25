import axiosInstance from "../axios-orders";

const request = (
  url,
  method,
  data,
  headers = { "Content-Type": "application/json" }
) => {
  if (sessionStorage.getItem("token")) {
    headers.Authorization = `Bearer ` + sessionStorage.getItem("token");
  }
  return axiosInstance({
    url,
    method,
    data,
    headers
  });
};

class HttpService {
  static post(url, data) {
    return request(url, "post", data);
  }

  static put(url, data) {
    return request(url, "put", data);
  }

  static get(url) {
    return request(url, "get", {});
  }

  static update(url, data) {
    return request(url, "put", data);
  }

  static delete(url) {
    return request(url, "delete");
  }
}

export default HttpService;
