import { SET_CREATED_AT } from "~/constants/Actions";
import { fetchGet } from "../../../../fetch";
import { USERS_USER_URL } from "../../../../constants/Fetch";
import { SET_AVATAR_URL, SET_LOGIN } from "../../../../constants/Actions";
import {
  setFollowersCount,
  setFollowingCount,
  setReposCount
} from "../UserTabView/InfoPage";
import { setName } from "../../../Login";

export const setCreatedAt = createdAt => ({
  type: SET_CREATED_AT,
  createdAt
});

export const setAvatarUrl = avatarUrl => ({
  type: SET_AVATAR_URL,
  avatarUrl
});

export const setLogin = login => ({
  type: SET_LOGIN,
  login
});

export const getUserInfo = () => {
  const func = (dispatch, getState) => {
    fetchGet(
      USERS_USER_URL(getState().login),
      {
        Authorization: `token ${getState().token}`
      },
      {}
    )
      .then(data => {
        const {
          avatar_url: avatarUrl,
          login,
          created_at: createdAt,
          followers,
          following,
          public_repos: publicRepos,
          name
        } = data;
        dispatch(setCreatedAt(createdAt));
        dispatch(setLogin(login));
        dispatch(setAvatarUrl(avatarUrl));
        dispatch(setFollowersCount(followers));
        dispatch(setFollowingCount(following));
        dispatch(setReposCount(publicRepos));
        dispatch(setName(name));
      })
      .catch(error => {
        console.error(error);
      });
  };
  return func;
};
