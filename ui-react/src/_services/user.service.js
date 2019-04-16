import { handleResponse } from "../_helpers";

export const userService = {
  register
};

function register(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${ process.env.REACT_APP_API_URL }/api/users/register`, requestOptions)
    .then(handleResponse);

}