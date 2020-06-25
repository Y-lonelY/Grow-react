import moment from 'moment'
export interface DatePickerType {
  value: [moment.Moment, moment.Moment]
  change: (
    dates: [moment.Moment, moment.Moment],
    dateStrings: [string, string]
  ) => void
}