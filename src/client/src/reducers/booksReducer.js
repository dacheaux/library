import { fromJS } from 'immutable';
import { FETCH_BOOKS, ADD_BOOK, DELETE_BOOK } from '../actions';

const initialState = {
	list: [],
	error: null,
};

export default function (state = fromJS(initialState), action) {
	switch (action.type) {
	case FETCH_BOOKS:
		return fromJS(action.payload);
	case ADD_BOOK:
		if (action.payload.book) {
			return state.update('list', list => (
				list.unshift(fromJS(action.payload.book))
			));
		}
		return state.set('error', action.payload.error);
	case DELETE_BOOK:
		return state.update('list', list => (
			list.filter(book => book.get('id') !== action.payload)
		));
	default:
		return state;
	}
}
