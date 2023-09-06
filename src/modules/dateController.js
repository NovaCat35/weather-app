import { format, parse } from "date-fns";

// Format the default raw string value "yyyy-MM-dd" to --> LLL d, yyyy (shorthand for month)
export default function formatDate(rawDate) {
  console.log(rawDate);

  let [dateString, timeString] = rawDate.split(' ')
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  console.log(date);

  const formattedDate = format(date, "LLL d, yyyy");
  return formattedDate;
}
