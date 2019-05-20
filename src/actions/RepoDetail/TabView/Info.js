import { showLoadingDialog,dismissLoadingDialog } from "../../Common";
import { SET_README } from "../../../constants/Actions";
import { fetchGet } from "../../../fetch";
import { README_URL } from "../../../constants/Fetch";

export const setReadme = readme => ({
  type: SET_README,
  readme
});

export const getReadme = (title, author, ref) => {
  const func = (dispatch, getState) => {
    // fetchGet(
    //   USER_URL,
    //   {
    //     Authorization: `token ${tokenData.token}`
    //   },
    //   {}
    // )
    //   .then(data => {
    //     const { token, scopes } = tokenData;
    //     const { avatar_url: avatarUrl, login, name } = data;
    //     toast(TOAST_LOGIN_SUCCESS);
    //     dispatch(loginSuccess(token, scopes, avatarUrl, login, name));
    //     storeData(
    //       LOGIN_DATA,
    //       JSON.stringify({
    //         token: token,
    //         scopes: scopes,
    //         avatarUrl: avatarUrl,
    //         login: login,
    //         name: name
    //       })
    //     );
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     toast(TOAST_LOGIN_FAIL);
    //     dispatch(loginFail());
    //   });

    dispatch(showLoadingDialog());
    fetchGet(
      README_URL(title, author),
      { Accept: "application/vnd.github.VERSION.html" },
      { ref: ref }
    )
      .then(data => {
        console.log(data);
        
        dispatch(setReadme(data));
        dispatch(dismissLoadingDialog());
      })
      .catch(error => {
        dispatch(dismissLoadingDialog());
        console.log(error);
      });
  };
  return func;
};
