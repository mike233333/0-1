import React, { useContext } from 'react';
import TaskList from './taskList';
import Filter from './filter';
import './style.css';
import { thingSelected, edit, removeTask } from '../actions';
import { Menu } from 'antd';
import { totalContext } from '../../Store';
const Task = ({}) => {
    const { state, dispatch } = useContext(totalContext);
    return (
        <Menu id='task'>
            <Filter />
            <TaskList />
            <Menu.Item onClick={() => dispatch(removeTask(state.selectedTask))} style={{ position: 'fixed', bottom: '40px', width: '206px', borderTop: '1px solid #f0f0f0' }}>删除任务</Menu.Item>
            <Menu.Item style={{ position: 'fixed', bottom: '0px', width: '206px', borderTop: '1px solid #f0f0f0' }} onClick={() => state.selected || state.selected === 0 ? (
                dispatch(thingSelected(null)),
                dispatch(edit())
            ) : []}>添加任务</Menu.Item>
        </Menu>
    )
}

export default Task;
/*
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
export default connect(mapStateToProps, mapDispatchToProps)(Task);
*/