import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  showTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComp() {
  const { id } = useParams(); // access route parameters /todo/:id
  const authContext = useAuth();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => showTodo(), [id]);

  const username = authContext.username;

  const navigate = useNavigate();

  function showTodo() {
    if (id != -1) {
      showTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    console.log(values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    // Put and Post
    if (id == -1) {
      createTodoApi(username, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {};
    if (values.description.length < 5) {
      errors.description = "Description is required";
    }
    // if (
    //   values.targetDate == null ||
    //   values.targetDate == "" ||
    //   moment(values.targetDate).isValid()
    // )
    if (values.targetDate == null || values.targetDate == "") {
      errors.targetDate = "Target date is required";
    }
    return errors;
  }

  return (
    <div className="container">
      <h2>Enter Todo Details</h2>
      <div className="">Description: {description}</div>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Decription</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
