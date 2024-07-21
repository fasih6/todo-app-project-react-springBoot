import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
  getHelloWorldBean,
  getHelloWorldPathVariable,
} from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

export default function WelcomComp() {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  const authContext = useAuth();

  function callHelloRest() {
    // axios
    //   .get("http://localhost:8080/hello-world")
    //   .then((response) => successfulResponse(response))
    //   .catch((error) => errorResponse(error))
    //   .finally(() => console.log("cleanup"));

    // getHelloWorldBean()
    //   .then((response) => successfulResponse(response))
    //   .catch((error) => errorResponse(error))
    //   .finally(() => console.log("cleanup"));

    getHelloWorldPathVariable(username, authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function errorResponse(error) {
    console.log(error);
  }

  function successfulResponse(response) {
    // console.log(response);
    // setMessage(response.data);
    setMessage(response.data.message);
  }

  return (
    <div className="Welcome">
      <h1>Welcome in {username} World</h1>
      <div>
        Manage Your Todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloRest}>
          Call Hello World REST API
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
