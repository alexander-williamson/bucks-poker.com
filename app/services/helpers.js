export const MonthNames = [
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

export const Colors = [
  "#f55142",
  "#f58442",
  "#f5b342",
  "#f5ec42",
  "#c8f542",
  "#87f542",
  "#4bf542",
  "#42f590",
  "#42f5b6",
  "#42f5f2",
  "#00bfff",
  "#0077ff",
  "#0022ff",
  "#9500ff",
  "#e100ff",
];

export function OrderSuffix(i) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}
