import React, { Component } from 'react';
import TaskContent from './taskContent';
import TaskName from './taskName';
import TaskTime from './taskTime';
import { ContentTypes } from '../../constants';
import * as actions from '../actions';
import {connect} from 'react-redux';
import './style.css';
class Content extends Component {
    constructor(props) {
        super(props);
        this.deliver = this.deliver.bind(this);
    }
    deliver(obj) {
        this.setState(obj);
    }
    render() {
        return (
            <div className='content'>
                {this.props.active === ContentTypes.DISPLAY ? (
                    <div className='content1'>
                        <TaskName prop={this.deliver} title={this.props.target.title} active={this.props.active} />
                        <input type="button" value="编辑" onClick={() => this.props.taskId||this.props.taskId===0?this.props.onEdit():[]} />
                        <input type="button" value="完成" onClick={() => this.props.onChangeState(this.props.taskId,true)} />
                        <input type="button" value="取消完成" onClick={() => this.props.onChangeState(this.props.taskId,false)} />
                    </div>
                ) : (
                        <div className='content1'>
                            <TaskName prop={this.deliver} title={this.props.target.title} active={this.props.active} />
                            <input type="button" value="取消" onClick={() => this.props.onCancel()} />
                            <input type="button" value="确认" onClick={() => this.props.onFinish(this.state,this.props.id,this.props.taskId)} />
                        </div>
                    )}
                <TaskTime prop={this.deliver} time={this.props.target.time} active={this.props.active} />
                <TaskContent prop={this.deliver} content={this.props.target.content} active={this.props.active} />
            </div>
        )
    }
}
function searchTask(taskId, task) {
    var target;
    for (let i = 0; i < task.length; i++) {
        if (task[i].taskId === taskId) {
            target = task[i];
        }
    }
    return target||0;
}
const mapStateToProps = (state, ownProps) => {
    return {
        target: searchTask(state.selectedTask, state.task),
        active: state.taskState,
        taskId: state.selectedTask,
        id:state.selected
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEdit: () => {
            dispatch(actions.edit())
        },
        onChangeState: (id,bool) => {
            dispatch(actions.toggle(id,bool))
        },
        onCancel: () => {
            dispatch(actions.display())
        },
        onFinish: (obj,id,selected) => {
            if(obj.title.length>10||obj.time.search(/^\d{4}-\d{2}-\d{2}$/)===-1||obj.content.length===0)return false;
            dispatch(actions.addTask(obj,id,selected));
            dispatch(actions.display())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)