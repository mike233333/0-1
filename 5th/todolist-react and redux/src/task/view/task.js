import React from 'react';
import TaskList from './taskList';
import Filter from './filter';
import './style.css';
import {connect} from 'react-redux';
import { thingSelected,edit } from '../actions';
const Task = ({onAdd,catId}) => {
    return (
        <div id='list'>
            <Filter />
            <TaskList />
            <div className='foot foot2' onClick={()=>catId||catId===0?onAdd():[]}>添加任务</div>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        catId: state.selected,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: () => {
            dispatch(thingSelected(null));
            dispatch(edit());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Task)