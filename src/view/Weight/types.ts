import moment from 'moment'

export interface WeightState {
  users: [];
  weights: [];
  loading: boolean;
  drawerDisplay: boolean;
  params?: Object
}

export interface WeightContext {
  state: WeightState;
  dispatch: Function;
  query: Function
}

export interface QueryParams {
  user: string;
  start: moment.Moment;
  end: moment.Moment
}
