import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import testReducer from "./reducers/rd-test";

const ROOT_REDUCERS = combineReducers({
  testReducer,
  sample: (state = {}) => state
});

const INITIAL_STATE = {
  sample: {
    test: "test"
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = IS_DEV
  ? createStore(ROOT_REDUCERS, INITIAL_STATE, composeEnhancers(applyMiddleware(thunk)))
  : createStore(ROOT_REDUCERS, INITIAL_STATE, applyMiddleware(thunk));
