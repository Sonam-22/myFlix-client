import React from "react";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        // onClick() event listener will set selectedMovie variable in main-view to this movie

        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  }
}
