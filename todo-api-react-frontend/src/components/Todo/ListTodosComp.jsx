import { useEffect, useState } from "react";
import "./Todo.css";
import { getTodosForUser, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComp() {
  // const today = new Date();
  // const targetDate = new Date(today.getFullYear, today.getMonth, today.getDay);
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => refreshTodos(), []);

  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  function refreshTodos() {
    getTodosForUser(username)
      .then((response) => {
        // console.log(response);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then((response) => {
        setMessage(`Delete of todo with Id ${id} is successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    console.log("hello from update todo");
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    console.log("hello from addnew todo todo");
    navigate(`/todo/-1`);
  }

  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Done</th>
              <th scope="col">Target Date</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()} </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container">
          <button className="btn btn-success m-3" onClick={addNewTodo}>
            Add New Todo
          </button>
        </div>
      </div>
      <div>Todo Details</div>
    </div>
  );
}

// const todos = [
//   {
//     id: 1,
//     description: "learn AWS",
//     done: false,
//     targetDate: targetDate,
//   },
//   {
//     id: 2,
//     description: "learn Azure",
//     done: false,
//     targetDate: targetDate,
//   },
//   {
//     id: 3,
//     description: "learn GCP",
//     done: false,
//     targetDate: targetDate,
//   },
// ];
