import {
  SET_REPO_LIST_TYPE,
  SET_REPO_LIST_SORT,
  SET_REPO_LIST_SORT_ITEMS
} from "~/constants/Actions";

export const setRepoListType = repoListType => ({
  type: SET_REPO_LIST_TYPE,
  repoListType
});

export const setRepoListSort = repoListSort => ({
  type: SET_REPO_LIST_SORT,
  repoListSort
});

export const setRepoListTypeItems = repoListTypeItems => ({
  type: SET_REPO_LIST_SORT_ITEMS,
  repoListTypeItems
});
