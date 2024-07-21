// import axios from "axios";
import { apiClient } from "./ApiClient";

// export default function getHelloWorldBean() {
//   return axios.get("http://localhost:8080/hello-world-bean");
// }

export const getHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const getHelloWorldPathVariable = (username, token) =>
  apiClient.get(`/hello-world/path-variable/${username}`);

// export const executeBasicAuthService = (token) =>
//   apiClient.get(`/basicauth`, {
//     headers: {
//       Authorization: token,
//     },
//   });
