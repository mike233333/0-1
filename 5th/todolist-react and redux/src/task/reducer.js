import { Add, Remove, Selected, FilterSelected, Toggle } from './actionTypes';
import { FilterTypes } from '../constants';
const taskReducer1 = (state = [], action) => {
    switch (action.type) {
        case Add: {
            var _state = JSON.parse(JSON.stringify(state));
            var bool = 1;
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].taskId === action.selected) {
                    for (let j in action.task) {
                        _state[i][j] = action.task[j];
                        bool = 0;
                    }
                }
            }
            if (bool) {
                _state.push({
                    parentId: action.id,
                    taskId: Date.parse(new Date()),
                    title: action.task.title,
                    time: action.task.time,
                    content: action.task.content,
                    done: false
                })
            }
            return _state;
        }
        case Remove: {
            return state.filter(item => {
                return item.taskId !== action.id;
            })
        }
        case Toggle: {
            return state.map(item => {
                if (item.taskId === action.id) {
                    return { ...item, done: action.done };
                } else {
                    return item;
                }
            })
        }
        default: {
            return state;
        }
    }
}
const taskReducer2 = (state = [], action) => {
    switch (action.type) {
        case Selected: {
            return action.id
        }
        default: {
            return state;
        }
    }
}
const filterSelect = (state = FilterTypes.ALL, action) => {
    switch (action.type) {
        case FilterSelected: {
            return { name: action.filter };
        }
        default:
            return state;
    }
}
export { taskReducer1, taskReducer2, filterSelect };