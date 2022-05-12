import { MovieCard } from "../movie-card/movie-card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { Fragment } from "react";

export function DirectorView(props) {
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
        <h1 className="display-4">{props.director.Name}</h1>
      </div>

      <div>
        <span className="value">{props.director.Bio}</span>
      </div>
      <br />
      <div>
        <h4>Other movies from this director:</h4>
      </div>

      <Row className="justify-content-md-center">
        {props.movies
          .filter((m) => m.Director.Name === props.director.Name)
          .map((m) => (
            <Col xs={12} sm={6} className="d-flex" key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))}
      </Row>

      <Link to={"/"}>
        <Button variant="outline-light">Back to full list</Button>
      </Link>
    </Fragment>
  );
}
