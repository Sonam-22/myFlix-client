import React from "react";

import { MovieCard } from "../movie-card/movie-card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Fragment } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../actions/actions";

function GenreView(props) {
  const genre = props.movies.find((m) => m.Genre.Name === props.genre).Genre;

  return (
    <Fragment>
      <div>
        <Button
          variant="outline-light"
          onClick={() => {
            props.onBackClick();
          }}
        >
          Back
        </Button>
      </div>

      <div>
        <h1 className="display-4">{genre.Name}</h1>
      </div>
      <div>
        <span className="value">{genre.Description}</span>
      </div>
      <br />
      <div>
        <h4>Some movies in this genre:</h4>
      </div>

      <Row className="justify-content-md-center">
        {props.movies
          .filter((m) => m.Genre.Name === props.genre)
          .map((m) => (
            <Col xs={12} sm={6} className="d-flex" key={m._id}>
              <MovieCard
                movie={m}
                auth={props.auth}
                onUserUpdated={(user) => props.updateUser(user)}
              />
            </Col>
          ))}
      </Row>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  const { movies, auth } = state;
  return { movies, auth };
};

const mapActionsToProps = (dispatch) => ({
  updateUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(updateUser(user));
  },
});

export default connect(mapStateToProps, mapActionsToProps)(GenreView);
