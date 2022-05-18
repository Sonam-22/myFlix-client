import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";
import { Badge } from "react-bootstrap";
import { API_ROOT } from "../../constants/constants";

import heart from "../../assets/icons/heart.svg";

export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favourite: false,
    };
  }

  componentDidMount() {
    const { movie, auth } = this.props;
    const user = auth.user;
    this.setState({
      favourite: user.favouriteMovies.includes(movie._id),
    });
  }

  addToFavourite() {
    const { movie, onUserUpdated, auth } = this.props;
    const token = auth.token;
    const user = auth.user;
    axios
      .post(
        `${API_ROOT}/users/${user.userName}/movies/${movie._id}`,
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
        const newUser = {
          ...user,
          favouriteMovies: user.favouriteMovies.concat(movie._id),
        };
        onUserUpdated(newUser);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img
          variant="top"
          style={{
            height: "25vh",
          }}
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>
            {movie.Title}
            {this.state.favourite && <img className="ms-2" src={heart}></img>}
          </Card.Title>

          <Card.Text className="text-truncate">{movie.Description}</Card.Text>
          <Button className="me-2" href={`/movies/${movie._id}`}>
            Open
          </Button>
          {!this.state.favourite && (
            <Button
              variant="outline-secondary"
              onClick={() => this.addToFavourite()}
            >
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
