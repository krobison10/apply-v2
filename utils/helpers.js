import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


export function capitalizeFirstLetter(string) {
  if (!string || typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function formatSinceDateNicely(date) {
  const now = dayjs();
  const inputDate = dayjs(date);
  const daysAgo = now.diff(inputDate, 'day');

  // If the date is more than 7 days ago, return a formatted date string
  if (daysAgo > 7) {
    return inputDate.format('MMM D, YYYY'); // e.g., "Jan 1, 2020"
  }

  // Otherwise, return a relative time string (e.g., "3 days ago")
  return inputDate.fromNow();
}
