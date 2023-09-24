const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertToWords(date_str: string): string {
  const temp_date: string[] = date_str.split("-");

  return (
    temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0]
  );
}

export function formatDateInWords(inputDate: Date): string {
  // Convert the input date to a JavaScript Date object
  const currentDate: Date = new Date();
  const inputDateObj: Date = new Date(inputDate);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDateObj;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit and format the output
  if (timeDifference < minute) {
    return `${Math.floor(timeDifference / 1000)} sec${check(
      Math.floor(timeDifference / 1000)
    )} ago`;
  } else if (timeDifference < hour) {
    return `${Math.floor(timeDifference / minute)} min${check(
      Math.floor(timeDifference / minute)
    )} ago`;
  } else if (timeDifference < day) {
    return `${Math.floor(timeDifference / hour)} hour${check(
      Math.floor(timeDifference / hour)
    )} ago`;
  } else if (timeDifference < week) {
    return `${Math.floor(timeDifference / day)} day${check(
      Math.floor(timeDifference / day)
    )} ago`;
  } else if (timeDifference < month) {
    return `${Math.floor(timeDifference / week)} week${check(
      Math.floor(timeDifference / week)
    )} ago`;
  } else if (timeDifference < year) {
    return `${Math.floor(timeDifference / month)} month${check(
      Math.floor(timeDifference / month)
    )} ago`;
  } else {
    return `${Math.floor(timeDifference / year)} year${check(
      Math.floor(timeDifference / year)
    )} ago`;
  }
}

function check(value: number): string {
  return value > 1 ? "s" : "";
}
