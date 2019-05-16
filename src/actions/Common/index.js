import { SHOW_LOADING_DIALOG, DIMISS_LOADING_DIALOG } from "../../constants/Actions";

export const showLoadingDialog = () => ({
  type: SHOW_LOADING_DIALOG
});

export const dismissLoadingDialog = () => ({
  type: DIMISS_LOADING_DIALOG
});
