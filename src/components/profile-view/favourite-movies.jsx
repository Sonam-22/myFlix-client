import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Button } from "react-bootstrap";

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMoviesList.length === 0 ? (
          <div>You have no favourite movies yet</div>
        ) : (
          favoriteMoviesList.map((movie) => {
            return (
              <Col xs={12} md={6} lg={4} key={movie._id}>
                <Card
                  className="bg-light text-black"
                  border="danger"
                  style={{ width: "20rem", height: "20rem", margin: ".5rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    crossOrigin="true"
                    style={{ height: "12rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {movie.Year}
                    </Card.Subtitle>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFav(movie._id)}
                    >
                      Remove from Favorites
                    </Button>
                    <Button
                      className="ms-2"
                      variant="danger"
                      href={`/movies/${movie._id}`}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Fragment>
  );
}
