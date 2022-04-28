import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import "./login-view.scss";
// import { RegistrationView } from "../registration-view/registration-view";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
