import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { MainView } from "./components/main-view/main-view";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

//Finds the root of your app
const container = document.getElementById("app-container");

//tells react to render your app in the root Dom element
ReactDom.render(<MyFlixApplication />, container);
