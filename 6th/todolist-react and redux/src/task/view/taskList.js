import React from 'react';
import { connect } from 'react-redux';
import TaskItem from './taskItem';
import { removeTask, thingSelected } from '../actions';
import { FilterTypes } from '../../constants';
const TaskList = ({ task, selected, onSelect, onRemove, removeSelected }) => {
    var obj = {};
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
    var jsx = <div id='list2' onClick={event => removeSelected(event.target)}>
        {arr.map(item => (
            <ul className='ul3' key={item[0].time}>
                <span>{item[0].time}</span>
                {item.map(item => (
                    <TaskItem
                        key={item.taskId}
                        item={item}
                        className={selected === item.taskId ? 'hover2' : []}
                        onSelect={() => onSelect(item.taskId)}
                        onRemove={() => onRemove(item.taskId)}
                    />
                )
                )}
            </ul>
        ))}
    </div>
    return jsx;
}
function searchTask(id, task, filter) {
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