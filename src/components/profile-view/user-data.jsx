import React, { Fragment } from "react";

export function UserData(props) {
  const { userdata } = props;

  return (
    <Fragment>
      <h1 className="text-primary">{userdata.userName}</h1>
      <p>Email: {userdata.email}</p>
      <p>Birthday: {new Date(userdata.birthday).toLocaleDateString()}</p>
    </Fragment>
  );
}
