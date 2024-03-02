import moment from 'moment';
export const getMoment = () => {
  const now = moment();
  const year = now.year();
  const month = now.month() + 1;
  const date = now.date();
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