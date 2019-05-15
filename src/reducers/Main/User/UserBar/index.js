import { SET_CREATED_AT } from "~/constants/Actions";

export const createdAt = (state = "", action) => {
  switch (action.type) {
    case SET_CREATED_AT:
      return action.createdAt;
    default:
      return state;
  }
};
