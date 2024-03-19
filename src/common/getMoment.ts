import moment from 'moment';
export const getMoment = () => {
  const now = moment();
  const year = now.year();
  const month = (now.month() + 1).toString().padStart(2, '0');
  const date = (now.date()).toString().padStart(2, '0');
  const hour = now.hour();
  const minute = now.minute();
  return {
    year,
    month,
    date,
    hour,
    minute
  }
}