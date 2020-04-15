import React from "react"
import { Layout, Col, Row, Switch, Icon, Divider, Button, Modal } from "antd"
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
        </Divider>
        <Row className="main-footer" type="flex" justify="start">
          <Col className="cm" span={8}></Col>
          <Col className="cm mid" span={8}>
            <h2 className="title">关于</h2>
            <Button type="link" size="small" onClick={this.showAboutPanel}>
              About
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onCancel={() => {
                this.setState({ visible: false })
              }}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Col>
          <Col className="cm" span={8}>
            <h2 className="title">更多</h2>
            <div className="ft-item">
              <Button type="link" size="small" onClick={this.checkMockMode}>
                Mock
              </Button>
              <span className="ft-seperator">-</span>
              <span className="ft-label">
                {this.state.mockMode ? assets.mockMode : assets.realMode}
              </span>
            </div>
          </Col>
        </Row>
      </Footer>
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
