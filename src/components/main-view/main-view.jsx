import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a list of movies for testing purposes

      movies: [],
      // Set selectedMovie to null in the beginning, will be used to open MovieView component

      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://rocky-fortress-51190.herokuapp.com/movies")
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Create function to set the state of selectedMovie to the newSelectedMovie passed in onMovieClick and onBackClick props

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // If movie list is empty, display default message

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
