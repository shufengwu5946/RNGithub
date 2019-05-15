import {
  SET_FOLLOWERS_COUNT,
  SET_FOLLOWING_COUNT,
  SET_REPOS_COUNT
} from "~/constants/Actions";

export const setFollowersCount = followersCount => ({
  type: SET_FOLLOWERS_COUNT,
  followersCount
});

export const setFollowingCount = followingCount => ({
  type: SET_FOLLOWING_COUNT,
  followingCount
});

export const setReposCount = reposCount => ({
  type: SET_REPOS_COUNT,
  reposCount
});
