import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";
import { Badge } from "react-bootstrap";

export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favourite: false,
    };
  }

  componentDidMount() {
    const { movie } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      favourite: user.favouriteMovies.includes(movie._id),
    });
  }

  addToFavourite() {
    const { movie, onUserUpdated } = this.props;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `https://rocky-fortress-51190.herokuapp.com/users/${user.userName}/movies/${movie._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          favourite: true,
        });
        user.favouriteMovies.push(movie._id);
        onUserUpdated(user);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>
            {movie.Title}
            {this.state.favourite && (
              <Badge className="ms-2" bg="success">
                Favourite
              </Badge>
            )}
          </Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button className="me-2" href={`/movies/${movie._id}`}>
            Open
          </Button>
          {!this.state.favourite && (
            <Button onClick={() => this.addToFavourite()}>
              Add to favourite
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
