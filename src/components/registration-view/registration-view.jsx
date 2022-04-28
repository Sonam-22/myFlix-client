import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";

import { Form, Button, Card } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (
    <div className="app-container registration-container">
      <Card style={{ width: "40vw" }}>
        <Card.Body>
          <Card.Title className="fw-bolder">Sign Up</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter a username"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={5}
                placeholder="Your password must be 8 or more characters"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter an Email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                placeholder="Enter a birthday"
              />

              <Form.Group>
                <Button
                  type="submit"
                  className="mt-3 w-100"
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              </Form.Group>
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
