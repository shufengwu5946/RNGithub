import { SET_CREATED_AT } from "~/constants/Actions";
import { SET_FOLLOWERS_COUNT, SET_FOLLOWING_COUNT } from "~/constants/Actions";
import { SET_REPOS_COUNT } from "../../../../../constants/Actions";

export const createdAt = (state = "", action) => {
  switch (action.type) {
    case SET_CREATED_AT:
      return action.createdAt;
    default:
      return state;
  }
};

export const followersCount = (state = 0, action) => {
  switch (action.type) {
    case SET_FOLLOWERS_COUNT:
      return action.followersCount;
    default:
      return state;
  }
};

export const followingCount = (state = 0, action) => {
  switch (action.type) {
    case SET_FOLLOWING_COUNT:
      return action.followingCount;
    default:
      return state;
  }
};

export const reposCount = (state = 0, action) => {
  switch (action.type) {
    case SET_REPOS_COUNT:
      return action.reposCount;
    default:
      return state;
  }
};
