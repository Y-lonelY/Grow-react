import React from "react"
import { Layout, Col, Row, Divider, Button, Modal } from "antd"
import { LocaleContext } from "@/cluster/context"
import { config, setUseMock } from "@/config/sysConfig"
import "./index.scss"

interface FlowFooterState {
  mockMode: boolean
  visible: boolean
}

const { Footer } = Layout

class FlowFooter extends React.PureComponent<{}, FlowFooterState> {
  static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.state = {
      mockMode: config.useMock === "true" ? true : false,
      visible: false
    }
  }

  render() {
    const assets = this.context.assets.footerModule
    return (
      <Footer className="flow-footer">
        <Divider className="footer-seprator">
          Respect everything that happens
        </Divider></Footer>
    )
  }

  componentDidMount() {}

  checkMockMode = () => {
    const mode = !this.state.mockMode
    this.setState(
      {
        mockMode: mode
      },
      () => {
        setUseMock(mode)
      }
    )
  }

  showAboutPanel = () => {
    this.setState({
      visible: true
    })
  }
}

export default FlowFooter
