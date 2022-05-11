import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import "./login-view.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ROOT } from "../../constants/constants";

// import { RegistrationView } from "../registration-view/registration-view";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios
        .post(`${API_ROOT}/login`, {
          userName: username,
          password: password,
        })
        .then((response) => {
          props.onLoggedIn(response.data);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegister(username);
  };

  return (
    <div className="app-container login-container">
      <Card style={{ width: "40vw" }}>
        <Card.Body>
          <Card.Title className="fw-bolder">Login</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* code added here to display validation error */}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* code added here to display validation error */}
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
          </Form>

          <div className="mt-2">
            <Button
              variant="primary"
              className="w-100"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <span className="mb-2">Not signed up yet?</span>
            <Button type="submit" variant="link" onClick={handleRegistration}>
              Sign up
            </Button>
          </div>
        </Card.Body>

        {/* <RegistrationView
        onRegistration={(register) => this.onRegistration(register)}
      /> */}
      </Card>
    </div>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
