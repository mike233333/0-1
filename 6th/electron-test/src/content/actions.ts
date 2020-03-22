import * as actionTypes from './actionTypes';
import { AddTask, Display, Edit, Toggle } from '../interface';

export const addTask:AddTask=(obj,catId,selected)=>({
    type:actionTypes.Add,
    task:obj,
    id:catId,
    selected:selected
});
export const display:Display=()=>({
    type:actionTypes.Display
});
export const edit:Edit=()=>({
    type:actionTypes.Edit
});
export const toggle:Toggle=(taskId,bool)=>({
    type:actionTypes.Toggle,
    id:taskId,
    done:bool
});