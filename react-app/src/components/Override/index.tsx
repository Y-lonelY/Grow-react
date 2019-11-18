import React from 'react';
import { Empty, Icon, Button, Col, Row } from 'antd';
import './index.scss';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1509932_qg7yt9odoyf.js',
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

// heander
export function Header(props) {
    return (
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
                        title='添加 focus'
                        size='small'
                        type='link'>
                        Add
                    </Button>
                }
            </Col>
        </Row>
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
