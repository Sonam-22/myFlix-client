import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { API_ROOT } from "../../constants/constants";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./main-view.scss";

import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a list of movies for testing purposes
      showRegistrationForm: false,
    };
  }

  logout() {
    this.props.setUser(null, null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getMovies() {
    const { token } = this.props.auth;
    token &&
      axios
        .get(`${API_ROOT}/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Assign the result to the state
          this.props.setMovies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  componentDidMount() {
    this.getMovies();
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/

  onRegistration() {
    this.setState({
      showRegistrationForm: false,
    });
  }

  onRegister() {
    this.setState({
      showRegistrationForm: true,
    });
  }

  onLoggedIn() {
    this.getMovies();
  }

  render() {
    let { showRegistrationForm } = this.state;
    let {
      movies,
      auth: { user },
    } = this.props;
    //const { movies, selectedMovie, user, showRegistrationForm } = this.state;

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
            onLoggedIn={() => this.onLoggedIn()}
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
                    <MoviesList></MoviesList>
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
                        director={match.params.name}
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
                        genre={match.params.name}
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
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    auth: state.auth || {},
  };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
