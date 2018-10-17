import { fromJS, Map as iMap } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { FETCH_USER, FETCH_BOOKS, ADD_BOOK } from './actions';

function userReducer(state = fromJS({ profile: false, error: null }), action) {
	switch (action.type) {
	case FETCH_USER:
		return iMap(action.payload);
	default:
		return state;
	}
}

function booksReducer(state = fromJS({ list: [], error: null }), action) {
	switch (action.type) {
	case ADD_BOOK:
		return state.mergeDeep(fromJS(action.payload));
	case FETCH_BOOKS:
		return fromJS(action.payload);
	default:
		return state;
	}
}

export default combineReducers({
	user: userReducer,
	books: booksReducer,
});
