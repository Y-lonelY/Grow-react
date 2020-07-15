export interface WakatimeState {
  loading: boolean,
  wakatimes: []
}

export interface WakatimeContext {
  state: WakatimeState,
  dispatch: Function | null,
}