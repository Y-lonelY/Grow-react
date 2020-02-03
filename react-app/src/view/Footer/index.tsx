import React from "react"
import { Layout, Col, Row, Switch, Icon, Divider, Button, Modal } from "antd"
import { LocaleContext } from "@/cluster/context"
import { config, setUseMock } from "@/config/sysConfig"
import "./index.scss"

interface FlowFooterState {
  visible: boolean
}

const { Footer } = Layout

class FlowFooter extends React.PureComponent<{}, FlowFooterState> {
  static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.state = {
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
          <Col className="cm" span={6}></Col>
          <Col className="cm" span={14}>
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
          <Col className="cm" span={4}>
            <Switch
              size="small"
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              checked={config.useMock === "true" ? true : false}
              onChange={this.switchChange}
            ></Switch>
            <span className="footer-switch-label"> - {assets.mock}</span>
          </Col>
        </Row>
      </Footer>
    )
  }

  componentDidMount() {}

  switchChange = (checked, event) => {
    setUseMock(checked)
  }

  showAboutPanel = () => {
    this.setState({
      visible: true
    })
  }
}

export default FlowFooter
