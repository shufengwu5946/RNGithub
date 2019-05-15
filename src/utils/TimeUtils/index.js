var moment = require("moment");
export default function utc2beijing(utc_datetime) {
  let localTime = moment.utc(utc_datetime).toDate();
  beijing_datetime = moment(localTime).format("YYYY-MM-DD HH:mm:ss");
  return beijing_datetime;
}
