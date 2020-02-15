import React, { Component } from 'react';
import { ContentTypes } from '../../constants';

class TaskTime extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event) {
        const _state = {
            time: event.target.value
        }
        this.props.prop(_state);
    }
    render() {
        if (this.props.active === ContentTypes.DISPLAY) {
            return (
                <p>任务日期：<span>{this.props.time}</span></p>
            )
        } else if (this.props.active === ContentTypes.EDIT) {
            return (
                <p>任务日期：<span><input type="text" placeholder="yyyy-mm-dd" onChange={this.onInputChange} defaultValue={this.props.time} /></span></p>
            )
        }

    }
}
export default TaskTime;