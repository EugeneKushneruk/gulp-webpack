import * as actions from "./actionsTypes";

export function testAction(str) {
  return {
    type: actions.TEST,
    payload: str
  }
}