import React, { useContext } from 'react';
import { removeTask, thingSelected } from '../actions';
import { FilterTypes } from '../../constants';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { totalContext } from '../../Store';
import { TaskListObj, RenderTree, SingleStateTask, SearchTask } from '../../interface';

const searchTask=(id:number, task:[SingleStateTask], filter:string)=> {
    var arr = [];
    for (let i = 0; i < task.length; i++) {
        if (task[i].parentId === id) {
            arr.push(task[i]);
        }
    }
    switch (filter) {
        case FilterTypes.ALL:
            return arr;
        case FilterTypes.UNCOMPLETED:
            return arr.filter(item => !item.done);
        case FilterTypes.COMPLETED:
            return arr.filter(item => item.done);
        default:
            throw new Error('unsupported filter');
    }
}

const TaskList = ({ }) => {
    let { state, dispatch } = useContext(totalContext);
    let task = searchTask(state.selected, state.task, state.filter.name)
    var obj:TaskListObj = {};
    task.forEach(item => {
        if (!obj[item.time]) {
            obj[item.time] = [];
        }
        obj[item.time].push(item);
    });
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    const renderTree:RenderTree = (data) => {
        return data.map((item:[SingleStateTask]) => (
            <SubMenu title={item[0].time} key={item[0].time}>
                {item.map(item => (
                    <Menu.Item key={item.taskId} style={item.done ? { backgroundColor: '#EBFFCC' } : { backgroundColor: '#e6f7ff' }} onClick={() => dispatch(thingSelected(item.taskId))}>{item.title}</Menu.Item>
                ))}
            </SubMenu>
        ))
    }
    let jsx = <Menu mode='inline'>
        {renderTree(arr)}
    </Menu>
    return jsx;
}


export default TaskList;

/*
const mapStateToProps = (state) => {
    return {
        task: searchTask(state.selected, state.task, state.filter.name),
        selected: state.selectedTask
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelect: (id) => {
            dispatch(thingSelected(id))
        },
        onRemove: (id) => {
            dispatch(removeTask(id))
        },
        removeSelected: (obj) => {
            if (obj.nodeName === "DIV") {
                dispatch(thingSelected(null));
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
*/