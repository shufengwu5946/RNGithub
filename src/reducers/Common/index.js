import { SHOW_LOADING_DIALOG, DIMISS_LOADING_DIALOG } from "../../constants/Actions";

export const loadingDialog = (state = false, action) => {
  switch (action.type) {
    case SHOW_LOADING_DIALOG:
      return true;
    case DIMISS_LOADING_DIALOG:
      return false;
    default:
      return state;
  }
};
