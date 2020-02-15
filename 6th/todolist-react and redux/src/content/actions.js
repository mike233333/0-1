import * as actionTypes from './actionTypes';

export const addTask=(obj,catId,selected)=>({
    type:actionTypes.Add,
    task:obj,
    id:catId,
    selected:selected
});
export const display=()=>({
    type:actionTypes.Display
});
export const edit=()=>({
    type:actionTypes.Edit
});
export const toggle=(taskId,bool)=>({
    type:actionTypes.Toggle,
    id:taskId,
    done:bool
});