import dateFormat from "dateformat";
import moment from "moment";
export function DataTime({ data }) {
  const date = moment(data);
  const validDate = date.isValid();
  // console.log("date", date);
  // console.log("validDate", validDate);
  return validDate ? dateFormat(data, "dd-mm-yyyy HH:MM:ss") : data;
}