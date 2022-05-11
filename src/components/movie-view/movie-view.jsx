import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }
  //Add Keypress event listener

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  //Unmount event listener

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view my-3">
        <div className="movie-poster">
          <img
            src={movie.ImagePath}
            crossOrigin="anonymous"
            width={500}
            height={500}
          />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link className="value" to={`/genres/${movie.Genre.Name}`}>
            {movie.Genre.Name}
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link className="value" to={`/directors/${movie.Director.Name}`}>
            {movie.Director.Name}
          </Link>
        </div>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
};
