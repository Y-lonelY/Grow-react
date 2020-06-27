import moment from 'moment'

export interface WeightState {
  users: [];
  weights: [];
  loading: boolean;
  drawerDisplay: boolean
}

export interface WeightContext {
  state: WeightState;
  dispatch: Function
}

export interface QueryParams {
  user: string;
  start: moment.Moment;
  end: moment.Moment
}
