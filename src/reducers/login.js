import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  SET_USER_NAME,
  SET_PASSWORD,
  SET_LOGIN,
  SET_AVATAR_URL,
  SET_TOKEN,
  SET_NAME
} from "../constants/Actions";

export const token = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.token;
    case SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};

export const scopes = (state = [], action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.scopes;
    default:
      return state;
  }
};

export const avatarUrl = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.avatarUrl;
    case SET_AVATAR_URL:
      return action.avatarUrl;
    default:
      return state;
  }
};

export const login = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.login;
    case SET_LOGIN:
      return action.login;
    default:
      return state;
  }
};

export const name = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.name;
    case SET_NAME:
      return action.name;
    default:
      return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return false;
    case LOGIN_FAIL:
      return false;
    case LOGIN_START:
      return true;
    default:
      return state;
  }
};

export const userName = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return "";
    case LOGIN_FAIL:
      return "";
    case LOGIN_START:
      return action.userName;
    case SET_USER_NAME:
      return action.userName;
    default:
      return state;
  }
};

export const password = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return "";
    case LOGIN_FAIL:
      return "";
    case LOGIN_START:
      return action.password;
    case SET_PASSWORD:
      return action.password;
    default:
      return state;
  }
};

export const loginSuccStatus = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAIL:
      return false;
    default:
      return state;
  }
};
