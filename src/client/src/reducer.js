import { fromJS, Map as iMap } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form';
import {
	FETCH_USER, FETCH_BOOKS, ADD_BOOK, DELETE_BOOK,
} from './actions';

function userReducer(state = fromJS({ profile: false, error: null }), action) {
	switch (action.type) {
	case FETCH_USER:
		return iMap(action.payload);
	default:
		return state;
	}
}

function booksReducer(state = fromJS({ list: [], error: null }), action) {
	const filterBook = book => book.get('id') !== action.payload;
	switch (action.type) {
	case FETCH_BOOKS:
		return fromJS(action.payload);
	case ADD_BOOK:
		return state.mergeDeep(fromJS(action.payload));
	case DELETE_BOOK:
		return state.update('list', list => list.filter(filterBook));
	default:
		return state;
	}
}

export default combineReducers({
	user: userReducer,
	books: booksReducer,
	form: reduxFormReducer,
});
