import { MovieCard } from "../movie-card/movie-card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Fragment } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../actions/actions";

function DirectorView(props) {
  const director = props.movies.find(
    (m) => m.Director.Name === props.director
  ).Director;
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

      <div className="director-name">
        <h1 className="display-4">{director.Name}</h1>
      </div>

      <div>
        <span className="value">{director.Bio}</span>
      </div>
      <br />
      <div>
        <h4>Other movies from this director:</h4>
      </div>

      <Row className="justify-content-md-center">
        {props.movies
          .filter((m) => m.Director.Name === props.director)
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
export default connect(mapStateToProps, mapActionsToProps)(DirectorView);
