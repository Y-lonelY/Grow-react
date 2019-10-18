import React from 'react';
import { Empty } from 'antd';

// override antd Empty
function SuperEmpty(props) {
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

export { SuperEmpty }