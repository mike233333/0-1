import { Add, Remove, Selected, FilterSelected, Toggle, Edit } from './actionTypes';
import { TaskAction, TaskAction2, TaskAction3 } from '../interface';

export const addTask:TaskAction = (name) => ({
    type: Add,
    id: Date.parse(`${new Date()}`),
    taskName: name
});
export const removeTask:TaskAction2 = (taskId) => ({
    type: Remove,
    id: taskId
});
export const thingSelected:TaskAction2 = (taskId) => ({
    type: Selected,
    id: taskId
});
export const filterSelected:TaskAction = (name) => ({
    type: FilterSelected,
    filter: name
});
export const toggle:TaskAction2 = (taskId) => ({
    type: Toggle,
    id: taskId
});
export const edit:TaskAction3 = () => ({
    type: Edit
});
