import "./Todo.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComp() {
  const [username, setUsername] = useState("in28minutes");
  const [password, setPassword] = useState("dummy");

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth();

  function handleUsernameChange(event) {
    // console.log(event.target.value);
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setError(true);
    }
  }

  return (
    <div className="Login">
      <h1>Time To Login</h1>
      {error && <div className="errorMessage"> Authentication Failed </div>}
      <div className="Loginform">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
