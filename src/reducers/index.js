import { combineReducers } from "redux";
import {
  userName,
  password,
  loading,
  loginSuccStatus,
  token,
  scopes,
  avatarUrl,
  login,
  name
} from "./login";
import { repoListType, repoListSort, repoListTypeItems } from "./repo";
import { createdAt } from "./Main/User/UserBar";
import {
  followersCount,
  followingCount,
  reposCount
} from "./Main/User/UserTabView/InfoPage";

const reducer = combineReducers({
  userName,
  password,
  loading,
  loginSuccStatus,
  repoListType,
  repoListSort,
  repoListTypeItems,
  token,
  scopes,
  avatarUrl,
  login,
  name,
  createdAt,
  followersCount,
  followingCount,
  reposCount
});

export default reducer;
