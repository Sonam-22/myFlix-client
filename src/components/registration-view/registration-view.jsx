import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./registration-view.scss";
import axios from "axios";

import { Form, Button, Card } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr("Username is required!");
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr("Username must be at least 3 characters long");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password is required!");
      isReq = false;
    }

    if (!email) {
      setEmailErr("Email is required!");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios
        .post("https://rocky-fortress-51190.herokuapp.com/users", {
          userName: username,
          password: password,
          email: email,
          birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          alert("Registration successful!");
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("Could not register");
          alert("Unable to register");
        });
    }
  };

  return (
    <div className="app-container registration-container">
      <Card style={{ width: "40vw" }}>
        <Card.Body>
          <Card.Title className="fw-bolder">Sign Up</Card.Title>
          <Form>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && <p className="font-italic">{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <p className="font-italic">{passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && <p className="font-italic">{emailErr}</p>}
            </Form.Group>

            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                className="mt-3 w-100"
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};
