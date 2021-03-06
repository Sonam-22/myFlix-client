export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(token, user) {
  return { type: SET_USER, value: { token, user } };
}

export function updateUser(user) {
  return { type: UPDATE_USER, value: user };
}
