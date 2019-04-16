import { authHeader, handleResponse } from "../_helpers";

export const bookService = {
  getAllByUserId,
  getById,
  getTagsByUserId,
  addBook,
  updateBook
};

function getAllByUserId(userId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${ process.env.REACT_APP_API_URL }/api/books/userId/${ userId }`, requestOptions)
    .then(handleResponse)
    .then((result) => {
      // filter out books with private flag, if in private mode
      if (process.env.REACT_APP_PRIVATE_MODE !== "false" && result) {
        result = result.filter(book => !book.private);
      }

      //default sort by title
      result.sort((a,b) => a.title > b.title ? 1 : -1);

      return result;
    });
}

function getById(bookId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${ process.env.REACT_APP_API_URL }/api/books/${ bookId }`, requestOptions).then(handleResponse);
}

function getTagsByUserId(userId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${ process.env.REACT_APP_API_URL }/api/books/userId/${ userId }/tags`, requestOptions).then(handleResponse);
}

function addBook(book) {
  const headers = authHeader();
  headers["Content-Type"] = "application/json";

  const requestOptions = { method: "POST", headers: headers, body: JSON.stringify(book) };
  return fetch(`${ process.env.REACT_APP_API_URL }/api/books`, requestOptions).then(handleResponse);
}

function updateBook(bookId, book) {
  const headers = authHeader();
  headers["Content-Type"] = "application/json";

  const requestOptions = { method: "PUT", headers: headers, body: JSON.stringify(book) };
  return fetch(`${ process.env.REACT_APP_API_URL }/api/books/${ bookId }`, requestOptions).then(handleResponse);
}