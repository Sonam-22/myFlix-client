import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { MainView } from "./components/main-view/main-view";
import { Navbar, Container } from "react-bootstrap";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="dark">
          <Container>
            <Navbar.Brand href="#">
              <h1 className="text-white fst-italic fw-bolder">MyFlix</h1>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <MainView />
        <footer>
          <div className="p-3 bg-dark text-white">&copy;2022 Sonam Priya</div>
        </footer>
      </Fragment>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

//tells react to render your app in the root Dom element
ReactDom.render(React.createElement(MyFlixApplication), container);
