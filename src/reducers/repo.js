import {
  SET_REPO_LIST_TYPE,
  SET_REPO_LIST_SORT,
  SET_REPO_LIST_SORT_ITEMS
} from "../constants/Actions";

export const repoListType = (state = "", action) => {
  switch (action.type) {
    case SET_REPO_LIST_TYPE:
      return action.repoListType;
    default:
      return state;
  }
};

export const repoListSort = (state = "", action) => {
  switch (action.type) {
    case SET_REPO_LIST_SORT:
      return action.repoListSort;
    default:
      return state;
  }
};

export const repoListTypeItems = (state = [], action) => {
  switch (action.type) {
    case SET_REPO_LIST_SORT_ITEMS:
      return action.repoListTypeItems;
    default:
      return state;
  }
};
