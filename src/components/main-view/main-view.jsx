import React, { Fragment } from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Container } from "react-bootstrap";
import { API_ROOT } from "../../constants/constants";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a list of movies for testing purposes
      showRegistrationForm: false,
      movies: [],
      // Set selectedMovie to null in the beginning, will be used to open MovieView component

      // selectedMovie: null,
      user: null,
    };
  }

  logout() {
    this.setState({
      user: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getMovies(token) {
    axios
      .get(`${API_ROOT}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (accessToken !== null) {
      this.setState({
        user: loggedInUser,
      });
      this.getMovies(accessToken);
    }
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

  onLoggedIn(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    this.setState({
      user: authData.user,
    });
    this.getMovies(authData.token);
  }

  handleUserUpdate(user) {
    this.setState({
      user,
    });
    if (!user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  render() {
    const { movies, selectedMovie, user, showRegistrationForm } = this.state;

    const header = (
      <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <h1 className="text-white fst-italic fw-bolder">MyFlix</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {user && (
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <NavDropdown
                  align="end"
                  className="text-white"
                  title={user.userName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href={`/users/${user.userName}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    );

    const footer = (
      <footer>
        <div className="p-3 bg-dark text-white">&copy;2022 Sonam Priya</div>
      </footer>
    );

    if (showRegistrationForm)
      return (
        <Fragment>
          {header}
          <RegistrationView
            onRegistration={(user) => this.onRegistration(user)}
          />
          {footer}
        </Fragment>
      );

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView//

    if (!user)
      return (
        <Fragment>
          {header}
          <LoginView
            onRegister={() => this.onRegister()}
            onLoggedIn={(user) => this.onLoggedIn(user)}
          />
          {footer}
        </Fragment>
      );

    return (
      <Fragment>
        {header}
        <Container className="main-view app-container py-3">
          <Row>
            <Router>
              <Route
                exact
                path="/"
                render={() => {
                  return movies.length === 0 ? (
                    <div>Loading</div>
                  ) : (
                    movies.map((m) => (
                      <Col sm={12} md={3} key={m._id}>
                        <MovieCard
                          movie={m}
                          onUserUpdated={(user) => this.handleUserUpdate(user)}
                        />
                      </Col>
                    ))
                  );
                }}
              />
              <Route
                path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />

              <Route
                path="/movies/:movieId"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div>Loading</div>;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path="/directors/:name"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div />;
                  return (
                    <Col md={8} sm={12}>
                      <DirectorView
                        movies={movies}
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path="/genres/:name"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div />;
                  return (
                    <Col md={8} sm={12}>
                      <GenreView
                        movies={movies}
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path="/users/:username"
                render={({ history, match }) => {
                  if (movies.length === 0) return <div />;
                  return (
                    <Col>
                      <ProfileView
                        history={history}
                        movies={movies}
                        user={user}
                        onUserUpdated={(user) => this.handleUserUpdate(user)}
                      />
                    </Col>
                  );
                }}
              />
            </Router>
          </Row>
        </Container>
        {footer}
      </Fragment>
    );
  }
}
