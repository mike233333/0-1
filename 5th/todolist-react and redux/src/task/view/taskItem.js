import React from 'react';
import PropTypes from 'prop-types';
const TaskItem = ({ item, onSelect, onRemove, className }) => {
    return (
        <li task-id={item.taskId} onClick={onSelect} className={className}>
            <input type='button' value='X' onClick={onRemove}></input>
            <p className={item.done === true ? 'donetrue' : []}>{item.title}</p>
        </li>
    )
}
TaskItem.propTypes = {
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}
export default TaskItem;