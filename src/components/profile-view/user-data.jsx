import React, { Fragment } from "react";

export function UserData(props) {
  const { userdata } = props;

  return (
    <Fragment>
      <h3>{userdata.userName}</h3>
      <p>Email: {userdata.email}</p>
      <p>Birthday: {new Date(userdata.birthday).toLocaleDateString()}</p>
    </Fragment>
  );
}
