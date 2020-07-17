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