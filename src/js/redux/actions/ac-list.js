import * as actions from "./ac-types";

export function testAction(str) {
  return {
    type: actions.TEST,
    payload: str
  }
}
