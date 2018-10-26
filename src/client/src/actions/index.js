import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const fetchUser = () => async (dispatch) => {
	axios.defaults.headers.common.Authorization = localStorage.getItem(
		'jwtToken'
	);
	const res = await axios.get('/api/user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBooks = () => async (dispatch) => {
	const res = await axios.get('/api/user/fetch-books');
	dispatch({ type: FETCH_BOOKS, payload: res.data });
};

export const addBook = values => async (dispatch) => {
	const res = await axios.post('/api/user/add-book', values);
	dispatch({ type: ADD_BOOK, payload: res.data });
};

export const deleteBook = id => async (dispatch) => {
	const res = await axios.delete(`/api/user/delete-book/${id}`);
	if (res.data.success) {
		dispatch({ type: DELETE_BOOK, payload: id });
	}
};