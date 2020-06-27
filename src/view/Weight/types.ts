import moment from 'moment'

export interface WeightState {
  users: []
  weights: []
}

export interface WeightContext {
  state: WeightState
  dispatch: Function
}

export interface QueryParams {
  user: string
  start: moment.Moment
  end: moment.Moment
}
