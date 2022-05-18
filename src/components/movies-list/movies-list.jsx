import React, { Fragment } from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { updateUser } from "../../actions/actions";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter, movies, auth } = state;
  return { visibilityFilter, movies, auth };
};

function MoviesList(props) {
  const { movies, visibilityFilter, auth } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;
  return (
    <Fragment>
      <Col md={12} style={{ marginBottom: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ marginBottom: "1em" }}
          key={m._id}
        >
          <MovieCard
            movie={m}
            auth={auth}
            onUserUpdated={(user) => props.updateUser(user)}
          />
        </Col>
      ))}
    </Fragment>
  );
}

const mapActionsToProps = (dispatch) => ({
  updateUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(updateUser(user));
  },
});

export default connect(mapStateToProps, mapActionsToProps)(MoviesList);
