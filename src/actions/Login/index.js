import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  SET_USER_NAME,
  SET_PASSWORD
} from "~/constants/Actions";
import { LOGIN_URL } from "~/constants/Fetch";
import { LOGIN_DATA, PASSWORD } from "~/constants/AsyncStorage";
import { storeData } from "~/utils/AsyncStorageUtils";
import toast from "~/utils/ToastUtils";
import {
  TOAST_USER_NAME_NOT_EMPTY,
  TOAST_PASSWORD_NOT_EMPTY,
  TOAST_LOGIN_SUCCESS,
  TOAST_LOGIN_FAIL
} from "~/constants/Login";
import { fetchGet, fetchPost } from "../../fetch";
import { Base64 } from "js-base64";
import { AUTHORIZATIONS_URL, USER_URL } from "../../constants/Fetch";
import {
  AUTH_SCOPES,
  AUTH_NOTE,
  AUTH_NOTE_URL,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET
} from "../../constants/Login";
import { SET_TOKEN, SET_LOGIN, SET_NAME } from "../../constants/Actions";

export const setUserName = userName => ({
  type: SET_USER_NAME,
  userName
});

export const setPassword = password => ({
  type: SET_PASSWORD,
  password
});

export const loginSuccess = (token, scopes, avatarUrl, login, name) => ({
  type: LOGIN_SUCCESS,
  token,
  scopes,
  avatarUrl,
  login,
  name
});

export const setToken = token => ({
  type: SET_TOKEN,
  token
});

export const setLogin = login => ({
  type: SET_LOGIN,
  login
});

export const setName = name => ({
  type: SET_NAME,
  name
});

export const loginFail = () => ({
  type: LOGIN_FAIL
});

export const loginStart = (userName, password) => ({
  type: LOGIN_START,
  userName,
  password
});

export const authorizations = () => {
  const func = (dispatch, getState) => {
    if (getState().userName.length == 0) {
      toast(TOAST_USER_NAME_NOT_EMPTY);
      return;
    }
    if (getState().password.length === 0) {
      toast(TOAST_PASSWORD_NOT_EMPTY);
      return;
    }

    dispatch(loginStart(getState().userName, getState().password));
    fetchPost(
      AUTHORIZATIONS_URL,
      {
        Authorization: `Basic ${Base64.encode(
          `${getState().userName}:${getState().password}`
        )}`,
        Accept: "application/json"
      },
      {
        scopes: AUTH_SCOPES,
        note: AUTH_NOTE,
        note_url: AUTH_NOTE_URL,
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET
      }
    )
      .then(data => {
        dispatch(getUserInfo(data));
      })
      .catch(error => {
        console.error(error);
        toast(TOAST_LOGIN_FAIL);
        dispatch(loginFail());
      });
  };
  return func;
};

export const getUserInfo = tokenData => {
  const func = (dispatch, getState) => {
    fetchGet(
      USER_URL,
      {
        Authorization: `token ${tokenData.token}`
      },
      {}
    )
      .then(data => {
        const { token, scopes } = tokenData;
        const { avatar_url: avatarUrl, login, name } = data;
        toast(TOAST_LOGIN_SUCCESS);
        dispatch(loginSuccess(token, scopes, avatarUrl, login, name));
        storeData(
          LOGIN_DATA,
          JSON.stringify({
            token: token,
            scopes: scopes,
            avatarUrl: avatarUrl,
            login: login,
            name: name
          })
        );
      })
      .catch(error => {
        console.error(error);
        toast(TOAST_LOGIN_FAIL);
        dispatch(loginFail());
      });
  };
  return func;
};
