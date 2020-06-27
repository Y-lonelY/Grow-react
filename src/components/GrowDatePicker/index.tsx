import React from 'react'
import { DatePicker } from 'antd'
import { LocaleContext } from '@/cluster/context'
import moment from 'moment'
import { DatePickerType } from './types'
import './index.scss'

const { RangePicker } = DatePicker

export default class GrowDatePicker extends React.Component<DatePickerType> {
  static contextType = LocaleContext
  constructor(props) {
    super(props)
  }

  render() {
    const locale = this.context.locale
    let dateRange = {}

    // set international content
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
      <RangePicker
        className="grow-range-picker"
        value={this.props.value}
        ranges={dateRange}
        locale={locale}
        allowClear={false}
        onChange={this.props.change}
      />
    )
  }
}
