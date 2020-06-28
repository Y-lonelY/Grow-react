interface PolylineData {
  x: number | string;
  y: number | string;
  value: number | string
}

export interface PolylineType {
  data: PolylineData[];
  height?: number;
  width?: number;
  padding?: string | [];
  // yAxis label display
  yLabel?: string
}