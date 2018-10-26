import { fromJS, Map as iMap } from 'immutable';
import { FETCH_USER } from '../actions';

const initialState = {
	profile: false,
	error: null,
};

export default function (state = fromJS(initialState), action) {
	switch (action.type) {
	case FETCH_USER:
		return iMap(action.payload);
	default:
		return state;
	}
}
