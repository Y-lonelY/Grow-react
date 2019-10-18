import React from 'react';
import { Collapse, Icon } from 'antd';
import { SuperEmpty } from '@/components/Override';
import { connect } from 'react-redux';
import { changeGoalList } from '@/store/Exercise/action';
import { getGoalList } from '@/service/exerciseService';
import { GoalListProps, GoalListState } from '@/index.d.ts';

const { Panel } = Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

/**
 * 业务和业务耦合，复用性较低，所以放在 view layer
 */
class GoalListView extends React.Component<GoalListProps, GoalListState> {
    constructor(props) {
        super(props);
        this.state = {
            expandIndex: '0'
        }
    }
    render() {
        const panelList = this.props.goalListData.map((item, index) => {
            return (
                <Panel
                    className={`goal-item ${String(index) === this.state.expandIndex ? 'active' : 'ow'}`}
                    key={String(index)}
                    header={item.reward}>
                </Panel>
            );
        });

        return(
            <div className='goalBox'>
                {Array.isArray(this.props.goalListData) && this.props.goalListData.length > 0 ?
                <Collapse
                    bordered={false}
                    accordion={true}
                    defaultActiveKey={this.state.expandIndex}
                    onChange={this.changeExpand}>
                    {panelList}
                </Collapse> : <SuperEmpty />
                }
            </div>
        );
    }

    async componentDidMount() {
        try {
            const res = await getGoalList();

            if (res.success) {
                this.props.changeGoalList(res.list);
                console.log(this.props.goalListData);
            }

            
        } catch (e) {
            throw(e);
        }
    }

    changeExpand = (value) => {
        const data = value === undefined ? '-1' : String(value);
        this.setState({
            expandIndex: data
        });
    }
}

function mapStateToProps({ goalListData }) {
    return {
        goalListData,
    }
}

export default connect(mapStateToProps, {
    changeGoalList
})(GoalListView);