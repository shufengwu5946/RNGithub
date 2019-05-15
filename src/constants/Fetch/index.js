export const LOGIN_URL = "https://api.github.com/user";
export const STARRED_URL = "https://api.github.com/user/starred";
export const EVENTS_URL = username =>
  `https://api.github.com/users/${username}/events`;
export const README_URL = (title, author) =>
  `https://api.github.com/repos/${author}/${title}/readme`;
export const REPOS_URL = author =>
  `https://api.github.com/users/${author}/repos`;
export const FOLLOWERS_URL = author =>
  `https://api.github.com/users/${author}/followers`;
export const AUTHORIZATIONS_URL = "https://api.github.com/authorizations";
export const USER_URL = "https://api.github.com/user";
export const USERS_USER_URL = login => `https://api.github.com/users/${login}`;
export const CONTENTS_URL = (owner, repo, path) =>
  `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
export const STAR_URL = (owner, repo) =>
  `https://api.github.com/user/starred/${owner}/${repo}`;
