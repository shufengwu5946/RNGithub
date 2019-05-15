var _ = require("lodash");
export default function getFileSize(number) {
  if (number < 1024) {
    return _.round(number) + " KB";
  } else if (number >= 1024 && number < 1024 * 1024) {
    return _.round(number / 1024) + " MB";
  } else if (number >= 1024 * 1024) {
    return _.round(number / 1024 / 1024) + " GB";
  } else {
    return _.round(number);
  }
}
