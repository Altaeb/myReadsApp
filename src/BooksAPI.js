const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
// eslint-disable-next-line prefer-destructuring
let token = localStorage.token;
if (!token)
  // eslint-disable-next-line no-multi-assign
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const get = bookId =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);
// Add 'signal' parametar to the search function in order to be able add AbortControler
export const getAll = (signal = null) =>
  fetch(`${api}/books`, { signal, headers })
    .then(res => res.json())
    .then(data => data.books);

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json());
// Add 'signal' parametar to the search function in order to be able add AbortControler
export const search = (query, signal = null) =>
  fetch(`${api}/search`, {
    signal,
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(data => data.books);
