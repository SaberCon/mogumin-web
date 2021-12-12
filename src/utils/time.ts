import moment from 'moment';

export function format(input: string) {
  return moment(input).format('YYYY-MM-DD HH:mm');
}

export function fromNow(input: string) {
  return moment(input).fromNow();
}
