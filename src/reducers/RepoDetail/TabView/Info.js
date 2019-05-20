import { SET_README } from "../../../constants/Actions";

export const readme = (state = "", action) => {
  switch (action.type) {
    case SET_README:
      return action.readme;
    default:
      return state;
  }
};
