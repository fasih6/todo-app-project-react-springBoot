import { apiClient } from "./ApiClient";

export const executeBasicAuthService = (token) =>
  apiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });

// for jwt we use post
export const executeJWTAuthService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
