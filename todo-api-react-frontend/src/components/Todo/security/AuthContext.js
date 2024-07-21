import { createContext, useState } from "react";
import { useContext } from "react";
// import { executeBasicAuthService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";
import { executeJWTAuthService } from "../api/AuthApiService";

// create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// put some state in the context
// share the created context with other components
export default function AuthProvider({ children }) {
  //   const [number, setNumber] = useState(0);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null); // token in context

  //   setInterval(() => setNumber(number + 1), 1000);

  // async function login(username, password) {
  //   // base64 encoded value
  //   const baToken = "Basic " + window.btoa(username + ":" + password);

  //   try {
  //     const response = await executeBasicAuthService(baToken);
  //     console.log(response);

  //     if (response.status == 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);

  //       apiClient.interceptors.request.use((config) => {
  //         console.log("adding token to every request");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     logout();
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await executeJWTAuthService(username, password);
      console.log(response);

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken); // setting token into context

        apiClient.interceptors.request.use((config) => {
          console.log("adding token to every request");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  const valueToShare = {
    isAuthenticated,
    username,
    token,
    setAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
}
