import React, { Component } from 'react';
import { ContentTypes } from '../../constants';

class TaskName extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event) {
        const _state={
            title:event.target.value
        }
        this.props.prop(_state);
    }
    render() {
        if (this.props.active === ContentTypes.DISPLAY) {
            return (
                <span>{this.props.title}</span>
            )
        } else if (this.props.active === ContentTypes.EDIT) {
            return (
                <span><input type="text" placeholder="可输入十个字符以内" onChange={this.onInputChange} defaultValue={this.props.title} /></span>
            )
        }
    }
}

export default TaskName;