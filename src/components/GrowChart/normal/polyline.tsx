import React from 'react'
import DataSet from '@antv/data-set'
import {
  Chart,
  Line,
  Point,
  Tooltip,
  Legend,
  getTheme,
  Axis,
  useChartInstance,
} from 'bizcharts'
import { Spin, Empty } from 'antd'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
// import style from '../index.less'
import { ChartProps } from '../type.d'

interface PolyState {
  loading: boolean
  view: { [index: string]: any }
}

const initProps = {
  data: [],
  theme: 'dark',
  x: 'x',
  y: 'y',
  z: 'z',
  padding: 'auto',
}

class Polyline extends React.Component<ChartProps, PolyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: true,
      view: {},
    }
  }

  initData = async () => {
    const { async, data } = this.props
    if (async) {
      this.setState({
        loading: true,
      })
      const current = await async()
      this.createDv(current)
    } else {
      this.createDv(data)
    }
  }

  createDv = (data: any) => {
    // declare a data set
    const ds = new DataSet({
      state: {
        name: 'details',
      },
    })
    const dv = ds.createView().source(data)
    dv.transform({
      type: 'map',
      callback(row) {
        row.ts = moment.unix(row.ts).format('MM-DD HH:mm:ss')
        return row
      },
    })
    this.setState({
      view: dv.rows,
      loading: false,
    })
  }

  generateItem() {
    const label = this.props.tooltipExtra ? this.props.tooltipExtra : ''
    return `<li data-index={index} class="g2-tooltip-list-item" style="margin-bottom: 10px;">
    <span class="g2-tooltip-marker" style="background-color:{color};"></span>
    <span class="g2-tooltip-name">{name}</span>
    :
    <b class="g2-tooltip-value" style="color: {color}">
    {value}
    <span>${label}</span>
    </b>
    </li>
    `
  }

  componentDidMount() {
    // if from hoc then avoid initdata
    if (this.props.isHoc) {
      this.setState({
        view: this.props.data,
        loading: false,
      })
    } else {
      this.initData()
    }
  }

  componentDidUpdate(prevProps: ChartProps, prevState: PolyState) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.setState({
        view: this.props.data,
      })
    }
  }

  render() {
    const { loading, view } = this.state
    const {
      x,
      y,
      z,
      theme,
      scaleX,
      scaleY,
      yAxis,
      height,
      width,
      padding,
    } = Object.assign({}, initProps, this.props)
    const darkTheme = getTheme('dark')
    const scale = {}
    scale[x] = scaleX
    scale[y] = scaleY

    return (
      <>
        {loading ? (
          <Spin />
        ) : (
          <>
            {view && view.length > 0 ? (
              <Chart
                data={view}
                height={height || 400}
                width={width}
                padding={padding}
                theme={theme === 'dark' ? darkTheme : ''}
                scale={scale}
                autoFit
              >
                <Legend visible={false} />
                {yAxis && !isEmpty(yAxis) && (
                  <Axis name={y} label={yAxis.label} />
                )}
                <Line position={`${x}*${y}`} shape="smooth" color={z} />
                <Tooltip
                  shared={true}
                  showCrosshairs={true}
                  itemTpl={this.generateItem()}
                  domStyles={{
                    'g2-tooltip-list-item': {
                      margin: '20px 0',
                    },
                  }}
                />
              </Chart>
            ) : (
              <Empty style={{ height }} />
            )}
          </>
        )}
      </>
    )
  }
}

export default Polyline
