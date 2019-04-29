import { Role, handleResponse } from "../_helpers";

export const userService = {
  register,
  isAdminUser,
  isDemoUser
};

function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  return fetch(`${ process.env.REACT_APP_API_URL }/api/users/register`, requestOptions)
    .then(handleResponse);

}

function isAdminUser(user) {
  return user && user.role === Role.Admin;
}

function isDemoUser(user) {
  return user && user.role === Role.Demo;
}
