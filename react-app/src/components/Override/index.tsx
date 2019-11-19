import React from 'react';
import { Empty, Icon, Button, Col, Row } from 'antd';
import { LocaleContext } from '@/cluster/context';
import './index.scss';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1509932_6wivr1bwg0j.js',
});

// override antd Empty
export function SuperEmpty(props) {
    let styleObject = {
        marginTop: props.mTop ? props.mTop : '32px'
    };

    return (
        <Empty
            style={styleObject}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无数据" >
        </Empty>
    );
}

/**
 * header
 * 对于 function 组件通过 LocaleContext.Consumer 来获取 context
 */
export function Header(props) {
    return (
        <LocaleContext.Consumer>
            {/* value 在这里代表 this.context */}
            {({assets}) =>
                <Row className='module-header' type='flex' justify='space-between'>
                    <Col className='text-box'>
                        <IconFont
                            className='icon'
                            type={props.icon.type}
                            style={props.icon.style} />
                        <span className='title'>{props.title}</span>
                    </Col>
                    <Col className='func-box'>
                        {props.showAddBtn &&
                            <Button
                                onClick={props.addEvent.bind(this, 'add')}
                                size='small'
                                type='link'>
                                {assets.add}
                        </Button>
                        }
                    </Col>
                </Row>
            }
        </LocaleContext.Consumer>
    );
}

export function SuperIcon(props) {
    return (
        <IconFont
            className={props.className}
            type={props.type}
            style={props.style} />
    );
}
