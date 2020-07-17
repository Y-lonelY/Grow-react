import moment from 'moment'

export interface WakatimeState {
  loading: boolean,
  wakatimes: [],
  params: {
    type: string,
    start: moment.Moment,
    end: moment.Moment
  }
}

export interface WakatimeContext {
  state: WakatimeState,
  dispatch: Function | null,
  query: Function | null
}