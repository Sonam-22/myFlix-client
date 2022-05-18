import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  UPDATE_USER,
} from "../actions/actions";

function getInitialUser() {
  const accessToken = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  return {
    token: accessToken,
    user: loggedInUser,
  };
}

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function auth(state = getInitialUser(), action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.value.token,
        user: action.value.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.value,
      };
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  auth,
});

export default moviesApp;
