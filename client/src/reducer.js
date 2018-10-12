import { fromJs } from 'immutable';

const initialState = fromJs({
  user: {}
})

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_BOOK':
      return state;
  }
}