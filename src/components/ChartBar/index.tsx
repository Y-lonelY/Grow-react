import React from 'react'
import {
  Row,
  Col,
  Switch,
  Icon,
  DatePicker,
  Button,
  Popover,
  Tooltip,
  Select,
} from 'antd'
import { LocaleContext } from '@/cluster/context'
import AddListFormInstance from './AddListForm'
import moment from 'moment'
import './index.scss'

// create interface to adapt props
interface ChartBarProps {
  title: string
  addBox?: {
    showAddButton: boolean
    initValue: {
      id: number
      date: string
      leg: string
      belly: string
      chest: string
    }
    addSubmit: (
      date: string,
      params: { leg: string; belly: string; chest: string }
    ) => void
  }
  showUpdate?: boolean
  asyncProgram?: () => void
  showNormalize?: boolean
  normalizeEvent?: (normalize: boolean) => void
  datePicker?: boolean
  defaultDateRange?: [moment.Moment, moment.Moment]
  rangeDateChange?: (
    dates: [moment.Moment, moment.Moment],
    dateStrings: [string, string]
  ) => void
  tableSwitch?: boolean
  switchChange?: (boolean) => void
  selector?: boolean
  selectorValue?: string | number
  selectorList?: { name: string; value?: string }[]
  selectorChange?: (value: string) => void
  programSwitch?: boolean
  programSwitchChange?: (boolean) => void
}

interface ChartBarState {
  popoverShow: boolean
  normalize: boolean
  programCircle: boolean
}

const { RangePicker } = DatePicker
const { Option } = Select

// 利用接口对传递参数进行检查
class ChartBar extends React.Component<ChartBarProps, ChartBarState> {
  static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.state = {
      popoverShow: false,
      normalize: false,
      programCircle: false,
    }
  }

  public render() {
    const title =
      this.props.title && this.props.title.trim() !== '' ? this.props.title : ''
    const locale = this.context.locale
    const assets = this.context.assets

    let dateRange = {}

    if (locale === 'zh_cn') {
      dateRange = {
        当月: [moment().startOf('month'), moment().endOf('month')],
        近7天: [moment().subtract(7, 'days'), moment()],
        近30天: [moment().subtract(30, 'days'), moment()],
        近90天: [moment().subtract(90, 'days'), moment()],
      }
    } else if (locale === 'en_us') {
      dateRange = {
        currentMonth: [moment().startOf('month'), moment().endOf('month')],
        sevenDays: [moment().subtract(7, 'days'), moment()],
        thirtyDays: [moment().subtract(30, 'days'), moment()],
        ninetyDays: [moment().subtract(90, 'days'), moment()],
      }
    }

    return (
      <div className="chartBar">
        <Row>
          <Col className="charBarTitle" span={6}>
            {title}
          </Col>
          <Col className="chartBarBox" span={18}>
            {/* 添加记录按钮 */}
            {this.props.addBox && this.props.addBox.showAddButton && (
              <Popover
                trigger="click"
                placement="bottom"
                content={
                  <AddListFormInstance
                    submit={this.addSubmit}
                    initValue={this.props.addBox.initValue}
                  />
                }
                visible={this.state.popoverShow}
                onVisibleChange={this.handlePopoverShow}
              >
                <Button
                  className={`addRecordBtn ${
                    this.state.popoverShow ? 'rotate' : ''
                  }`}
                  shape="circle"
                  icon="plus"
                  size="small"
                  type="default"
                />
              </Popover>
            )}

            {/* 归一化按钮 */}
            {this.props.showNormalize && (
              <Tooltip
                title={
                  this.state.normalize
                    ? assets.denormalization
                    : assets.normalize
                }
                placement="bottom"
              >
                <Button
                  className="normalizeBtn"
                  shape="circle"
                  icon={this.state.normalize ? 'stock' : 'branches'}
                  size="small"
                  type="default"
                  onClick={this.normalize.bind(this, this.state.normalize)}
                />
              </Tooltip>
            )}

            {/* program 同步按钮 */}
            {this.props.showUpdate && (
              <Tooltip title={assets.update} placement="bottom">
                <Button
                  className={`programBtn ${
                    this.state.programCircle ? 'circle' : ''
                  }`}
                  shape="circle"
                  icon="shake"
                  size="small"
                  type="default"
                  onClick={this.asyncProgram}
                />
              </Tooltip>
            )}

            {/* 下拉选择 */}
            {this.props.selector && this.props.selectorList.length > 0 && (
              <Select
                className="selectorPicker"
                style={{ width: '160px', marginRight: '10px' }}
                defaultValue="-127"
                value={
                  this.props.selectorValue ? this.props.selectorValue : '-127'
                }
                onChange={this.selectorChange}
                size="small"
                showSearch
              >
                <Option value="-127">{assets.all}</Option>
                {this.props.selectorList.map((item, index) => {
                  return (
                    <Option
                      key={index}
                      value={item.value ? item.value : item.name}
                    >
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}

            {/* 时间范围选择 */}
            {this.props.datePicker && (
              <RangePicker
                className="rangePicker"
                defaultValue={this.props.defaultDateRange}
                value={this.props.defaultDateRange}
                ranges={dateRange}
                locale={locale}
                size="small"
                allowClear={false}
                onChange={this.props.rangeDateChange}
              />
            )}

            {/* program lang/project switch */}
            {this.props.programSwitch && (
              <Switch
                className="programSwitch"
                checkedChildren="L"
                unCheckedChildren="P"
                onChange={this.props.programSwitchChange}
                defaultChecked
              />
            )}

            {/* 图表切换 */}
            {this.props.tableSwitch && (
              <Switch
                className="chartSwitch"
                checkedChildren={<Icon type="line-chart" />}
                unCheckedChildren={<Icon type="table" />}
                onChange={this.props.switchChange}
                defaultChecked
              />
            )}
          </Col>
        </Row>
      </div>
    )
  }

  // 添加按钮提交事件
  addSubmit = (date, data) => {
    this.setState({
      popoverShow: false,
    })
    this.props.addBox.addSubmit(date, data)
  }

  // 隐藏/展示tips
  handlePopoverShow = (visible) => {
    this.setState({
      popoverShow: visible,
    })
  }

  // 归一化
  normalize = (value: boolean) => {
    this.setState({
      normalize: !value,
    })
    this.props.normalizeEvent(!value)
  }

  // program record async
  asyncProgram = async () => {
    this.setState({
      programCircle: true,
    })
    try {
      await this.props.asyncProgram()
    } catch (e) {
      throw e
    } finally {
      // 保证请求完毕，不管结果，都会停止动画效果
      this.setState({
        programCircle: false,
      })
    }
  }

  // 下拉选择切换
  selectorChange = (value: string) => {
    this.props.selectorChange(value)
  }
}

export default ChartBar
