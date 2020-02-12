import React, { Component } from 'react';
import { ContentTypes } from '../../constants';

class TaskContent extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event) {
        const _state = {
            content: event.target.value
        }
        this.props.prop(_state);
    }

    render() {
        if (this.props.active === ContentTypes.DISPLAY) {
            return (
                <div id="taskContent2">{this.props.content}</div>
            )
        } else if (this.props.active === ContentTypes.EDIT) {
            return (
                <div><textarea cols="300" rows="100" placeholder="任务内容" onChange={this.onInputChange} defaultValue={this.props.content} ></textarea></div>
            )
        }
    }
}
export default TaskContent;