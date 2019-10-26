import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { StackedColumn } from '@/components/Chart';

class ProgramView extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="program-view">
                <StackedColumn></StackedColumn>
            </div>
        );
    }

    componentDidMount() {

    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps, {

})(ProgramView);