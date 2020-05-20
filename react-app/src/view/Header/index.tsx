import React from "react"
import { Layout, Col, Row, Button } from "antd"
import { withRouter } from "react-router-dom"
import { SuperIcon } from "@/components/Override"
import Treasure from './Treasure'
import { LocaleContext } from "@/cluster/context"
import Clock from "@/components/Clock"
import "./index.scss"

const { Header } = Layout

interface FlowHeaderProps {
  history: any
}

interface FlowHeaderState {
  current: number
}

class FlowHeader extends React.PureComponent<FlowHeaderProps, FlowHeaderState> {
  static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.state = {
      current: -1,
    }
  }

  public render() {
    const locale = this.context.locale
    const assets = this.context.assets
    /**
     * 从 local 拿到 header display 的 list
     * 轮询渲染
     */
    const headerItems = assets.headerItems
    return (
      <div className="flow-header">
        <Header className="header">
          <Row className="main-row" type="flex" justify="start">
            <Col span={2}>
              <span className="label" onClick={this.viewHomepage}>
                {assets.mainTitle}
                <sup>✦</sup>
              </span>
            </Col>
            <Col className="list" span={13} offset={1}>
              {headerItems.map((item, index) => {
                if (item.type === "item") {
                  return (
                    <div
                      className={`${item.type} ${
                        item.id === this.state.current ? "active" : ""
                      }`}
                      key={index}
                      onClick={this.handleRouter.bind(this, item.id)}
                    >
                      {item.label}
                    </div>
                  )
                } else if (item.type === "seperator") {
                  return <div key={index} className="seperator"></div>
                } else if (item.type === "link") {
                  return (
                    <div
                      className={`${item.type} ${
                        item.id === this.state.current ? "active" : ""
                      }`}
                      key={index}
                      title={item.label}
                      onClick={this.handleRouter.bind(this, item.id)}
                    >
                      <SuperIcon
                        type={`icon-${item.icon}`}
                        style={{ fontSize: "14px", paddingLeft: "2px" }}
                      />
                    </div>
                  )
                }
              })}
            </Col>
            <Col span={8}>
              <div className="func-box">
                <Treasure />
                <Button
                  className="locale"
                  size="small"
                  type="link"
                  onClick={this.toggleLocale}
                >
                  <SuperIcon
                    className="icon"
                    type={`icon-${locale === "zh_cn" ? "en_us" : "zh_cn"}`}
                  />
                </Button>
                <Clock />
              </div>
            </Col>
          </Row>
        </Header>
      </div>
    )
  }

  componentDidMount() {
    // 根据当前 url 渲染 active item
    const pathname = window.location.pathname
    const assets = this.context.assets
    const headerItems = assets.headerItems
    let label = -1
    headerItems.forEach((item) => {
      if (item.target === pathname) {
        label = item.id
        return
      }
    })
    this.setState({
      current: label,
    })
  }

  // 控制路由跳转
  handleRouter = (id) => {
    const assets = this.context.assets
    const headerItems = assets.headerItems

    if (id === this.state.current) {
      return
    } else {
      headerItems.forEach((item) => {
        if (item.id === id) {
          this.setState({
            current: id,
          })
          if (item.type === "link") {
            window.open(item.target, "_blank")
          } else if (item.type === "item") {
            this.props.history.push(item.target)
          }
        }
      })
    }
  }

  // 进入首页
  viewHomepage = () => {
    this.setState(
      {
        current: -1,
      },
      () => {
        this.props.history.push("/")
      }
    )
  }

  toggleLocale = () => {
    const toggle = this.context.toggleLocale
    const locale = this.context.locale
    let type = "zh_cn"
    if (locale === "zh_cn") {
      type = "en_us"
    }
    toggle(type)
  }
}

export default withRouter(FlowHeader)
