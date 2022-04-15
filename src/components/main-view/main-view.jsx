import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a list of movies for testing purposes

      movies: [
        {
          _id: 1,
          Title: "The Intern",
          Description: "desc1...",
          Genre: "Drama",
          Director: "Nancy Meyers",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BOGIzNGZjMzAtOGIyMS00ODMzLThlMTktYTM2Mjg5NTY4NTAzXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_FMjpg_UX1131_.jpg",
        },
        {
          _id: 2,
          Title: "Andhadhun",
          Description: "desc2...",
          Genre: "Comedy",
          Director: "Sriram Raghavan",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BZWZhMjhhZmYtOTIzOC00MGYzLWI1OGYtM2ZkN2IxNTI4ZWI3XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_FMjpg_UX1000_.jpg",
        },
        {
          _id: 3,
          Title: "Mimi",
          Description: "desc3...",
          Genre: "Drama",
          Director: "Laxman Utekar",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BZTkwMDQ4ZmEtNTdhNi00MmMzLTgwNTQtMDI1NDJjZjQ5Zjg5XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_FMjpg_UX1200_.jpg",
        },
      ],
      // Set selectedMovie to null in the beginning, will be used to open MovieView component

      selectedMovie: null,
    };
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

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

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
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
