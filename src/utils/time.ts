import moment from 'moment'

export const format = (input: string): string => moment(input).format('YYYY-MM-DD HH:mm')

export const fromNow = (input: string): string => moment(input).fromNow()
