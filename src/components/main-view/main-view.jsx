import React from "react";
import axios from "axios";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Container } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a list of movies for testing purposes
      showRegistrationForm: false,
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
  /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/

  onRegistration(user) {
    this.setState({
      user,
      showRegistrationForm: false,
    });
  }

  onRegister() {
    this.setState({
      showRegistrationForm: true,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user, showRegistrationForm } = this.state;

    if (showRegistrationForm)
      return (
        <RegistrationView
          onRegistration={(user) => this.onRegistration(user)}
        />
      );

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView//

    if (!user)
      return (
        <LoginView
          onRegister={() => this.onRegister()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    return (
      <div className="app-container main-view">
        <Container>
          {movies.length > 0 && (
            <Row className="justify-content-md-center my-3">
              {selectedMovie ? (
                <Col md={8}>
                  <MovieView
                    movie={selectedMovie}
                    onBackClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ) : (
                movies.map((movie) => (
                  <Col md={3}>
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        this.setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
                ))
              )}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
