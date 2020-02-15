import React, { Component } from 'react';
import { view as List } from './list';
import { view as Task } from './task';
import { view as Content } from './content';
import { connect } from 'react-redux';
class TodoApp extends Component {
    render() {
        return (
            <div className='div1' >
                <List />
                <Task />
                <Content />
            </div>
        );
    }
    componentDidMount() {
        localStorage.setItem('state', JSON.stringify(this.props.prop));
    }
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.props.prop));
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state
    }
}
export default connect(mapStateToProps)(TodoApp)
