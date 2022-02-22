import { combineReducers } from 'redux';

import todoReducer from './containers/todo/reducer';
import filterReducer from './containers/filter/reducer';
import counterReducer from './containers/counter/reducer';

const initialState = {
  authenticated: false,
}

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case "app/setAuthenticated":
      return {
        authenticated: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos: todoReducer, // state.todos.entities
  filters: filterReducer,
  counter: counterReducer,
  app: appReducer
});

export default rootReducer;
