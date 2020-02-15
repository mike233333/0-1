import { Add, Remove, Selected, FilterSelected, Toggle, Edit } from './actionTypes';

export const addTask = (name) => ({
    type: Add,
    id: Date.parse(new Date()),
    taskName: name
});
export const removeTask = (taskId) => ({
    type: Remove,
    id: taskId
});
export const thingSelected = (taskId) => ({
    type: Selected,
    id: taskId
});
export const filterSelected = (name) => ({
    type: FilterSelected,
    filter: name
});
export const toggle = (taskId) => ({
    type: Toggle,
    id: taskId
});
export const edit = () => ({
    type: Edit
});
