import { TEST } from "../actions/actionsTypes";
import update from 'immutability-helper';

const initialState = {
  testReducer: "test"
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return update(state, {
        testReducer: {$set: action.payload}
      });
    default:
      return state
  }
}
