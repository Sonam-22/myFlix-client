import React, { useState, useEffect } from "react";
import { Button, Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";
import { Nav } from "react-bootstrap";

import { UserData } from "./user-data";
import { UpdateUserForm } from "./update-user";
import { FavoriteMovies } from "./favourite-movies";
import { API_ROOT } from "../../constants/constants";
import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";

function ProfileView(props) {
  const [userdata, setUserdata] = useState(props.user);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([
    ...props.movies.filter((m) => props.user.favouriteMovies.includes(m._id)),
  ]);

  const token = props.auth.token;
  const currentUser = props.auth.user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleUserUpdate = (user) => {
    if (!user) {
      props.setUser(null, null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return;
    }
    props.updateUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_ROOT}/users/${currentUser.userName}`, userdata)
      .then((response) => {
        alert("Profile updated");
        handleUserUpdate(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProfile = (e) => {
    axios
      .delete(`${API_ROOT}/users/${userdata.userName}`)
      .then((response) => {
        alert("Your profile has beeen deleted");
        handleUserUpdate(null);

        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFav = (id) => {
    axios
      .delete(`${API_ROOT}/users/${currentUser.userName}/movies/${id}`)
      .then(() => {
        const newFavourites = favoriteMoviesList.filter(
          (movie) => movie._id != id
        );

        currentUser.favouriteMovies = currentUser.favouriteMovies.filter(
          (fmId) => id !== fmId
        );
        setFavoriteMoviesList(newFavourites);
        handleUserUpdate(currentUser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container className="app-container">
      <Row>
        <Col med={4}>
          <div className="mt-4">
            {/* Display userdata */}
            <UserData userdata={userdata} />
          </div>

          {/* List of favorite movies */}
          <div className="mb-2">
            <FavoriteMovies
              favoriteMoviesList={favoriteMoviesList}
              removeFav={removeFav}
            />
          </div>

          {/* Form to update user data */}
          <UpdateUserForm
            userdata={userdata}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />

          {/* Button to delete user */}
          <div className="d-flex flex-row p-2 border gap-4 my-4 justify-content-center align-items-center">
            <Button variant="danger" type="submit" onClick={deleteProfile}>
              Delete Profile
            </Button>
            <Nav.Link href="/">Back to Movies</Nav.Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

let mapStateToProps = (state) => {
  return {
    auth: state.auth || {},
  };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
