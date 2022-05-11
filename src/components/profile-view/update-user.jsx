import React, { Fragment } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function UpdateUserForm(props) {
  const { handleUpdate, handleSubmit, userdata } = props;
  // Return a registration form where users can submit their username, password, email and birthday
  // Listening to changes on input and then updating the respective states
  const birthday = new Date(userdata.birthday).toISOString().slice(0, 10);

  return (
    <Fragment>
      <h4>Update profile information</h4>
      <Form className="mb-3">
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={userdata.userName}
            name="userName"
            onInput={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userdata.password}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userdata.email}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            name="birthday"
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Update Profile
        </Button>
      </Form>
    </Fragment>
  );
}
