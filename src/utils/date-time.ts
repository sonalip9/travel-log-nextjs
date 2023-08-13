/**
 * Function to get the date format object from a date object.
 *
 * The meaning of the keys:
 * - D: Day of the month as digits; no leading zero for single-digit days.
 * - DD: Day of the month as digits; leading zero for single-digit days.
 * - M: Month as digits; no leading zero for single-digit months.
 * - MM: Month as digits; leading zero for single-digit months.
 * - MMM: Month as a three-letter abbreviation.
 * - MMMM: Month as its full name.
 * - YY: Year as last two digits; leading zero for years less than 10.
 * - YYYY: Year represented by four digits.
 * - d: Day of the week as single letter.
 * - dd: Day of the week as a two-letter abbreviation.
 * - dd: Day of the week as a three-letter abbreviation.
 * - dddd: Day of the week as its full name.
 * - h: Hours; no leading zero for single-digit hours (24-hour clock).
 * - hh: Hours; leading zero for single-digit hours (24-hour clock).
 * - m: Minutes; no leading zero for single-digit minutes.
 * - mm: Minutes; leading zero for single-digit minutes.
 * - s: Seconds; no leading zero for single-digit seconds.
 * - ss: Seconds; leading zero for single-digit seconds.
 * @param date The date of which you want to get the format object
 * @returns An object with the date format keys and values
 */
export const dateFormatObj = (date: Date): Record<string, string> => ({
  D: date.getDate().toString(),
  DD: date.getDate().toString().padStart(2, '0'),
  M: (date.getMonth() + 1).toString(),
  MM: (date.getMonth() + 1).toString().padStart(2, '0'),
  MMM: date.toLocaleString('default', { month: 'short' }),
  MMMM: date.toLocaleString('default', { month: 'long' }),
  YY: date.getFullYear().toString().slice(2),
  YYYY: date.getFullYear().toString(),

  d: date.toLocaleString('default', { weekday: 'narrow' }),
  dd: date.toLocaleString('default', { weekday: 'short' }).slice(0, 2),
  ddd: date.toLocaleString('default', { weekday: 'short' }),
  dddd: date.toLocaleString('default', { weekday: 'long' }),

  h: date.getHours().toString(),
  hh: date.getHours().toString().padStart(2, '0'),
  m: date.getMinutes().toString(),
  mm: date.getMinutes().toString().padStart(2, '0'),
  s: date.getSeconds().toString(),
  ss: date.getSeconds().toString().padStart(2, '0'),
});

/**
 * Function to format a date object to a string.
 * @param date The date object to format
 * @param formatString The format string to format the date object
 * @returns The formatted date string
 * @example
 * formatDateTime(new Date(), 'YYYY-MM-DD') // 2021-09-01
 * formatDateTime(new Date(), 'YYYY-MM-DD hh:mm:ss') // 2021-09-01 12:00:00
 */
export const formatDateTime = (date: Date, formatString: string): string => {
  const regex = /(d){1,4}|(D){1,2}|(M){1,4}|(Y){4}|(Y){2}|(h){1,2}|(m){1,2}(s){1,2}/g;

  const formatObj = dateFormatObj(date);

  formatString.match(regex)?.forEach((match) => {
    if (Object.keys(formatObj).includes(match)) {
      formatString = formatString.replace(match, formatObj[match]);
    }
  });

  return formatString;
};
