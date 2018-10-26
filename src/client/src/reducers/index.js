import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form';

import userReducer from './userReducer';
import booksReducer from './booksReducer';

export default combineReducers({
	user: userReducer,
	books: booksReducer,
	form: reduxFormReducer,
});
