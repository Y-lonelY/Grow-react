interface PolylineData {
  x: number | string;
  y: number | string;
  value: number | string
}

interface HisIntervalData {
  name: string,
  date: string,
  seconds: number
}

interface CommomType {
  height?: number;
  width?: number;
  padding?: string | [];
}

export interface PolylineType extends CommomType {
  data: PolylineData[];
  // yAxis label display
  yLabel?: string
}

export interface HisInterval extends CommomType {
  data: HisIntervalData[];
}

export interface ChartProps {
  data: {}[]
  theme?: 'dark' | 'light' 
  isHoc?: boolean
  loading?: boolean
  async?: Function
  x?: string
  y?: string
  z?: string
  scaleX?: {}
  scaleY?: {}
  yAxis?: { [index: string]: any }
  width?: number
  height?: number
  padding?: string | number | number[]
  tooltipExtra?: string
  // yAxis label display
  yLabel?: string
}

export interface ChartFrameProps extends ChartProps {
  title?: string
  subTitle?: string
  toolbar?: React.ReactNode | null
  children?: React.ReactNode
  contentStyle?: {}
  selection?: {key: string, value: any}[]
}

export interface ChartFrameState {
  rows?: any[]
  loading?: boolean
  dv?: {[index: string]: any}
  // control selection source data
  selectData?: {key: string, value: any}[]
  // control selection value
  selectValue?: string[]
}

export interface ChartFrameAction extends ChartFrameState {
  type?: string
}