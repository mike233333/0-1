import * as actionTypes from './actionTypes';
import * as actionTypesInCreate from '../create/actionTypes';

export const editQue = (id: number) => ({
    type: actionTypesInCreate.ChangeQue,
    id: id
});
export const scanData = (id: number) => ({
    type: actionTypesInCreate.ChangeQue,
    id: id
});
export const fillQue = (id: number) => ({
    type: actionTypesInCreate.ChangeQue,
    id: id
});


export const newItem = () => ({
    type: actionTypesInCreate.ChangeQue,
    id: Date.parse(`${new Date()}`)
});
export const removeItem = (id: number) => ({
    type: actionTypesInCreate.RemoveItem,
    id: id
});
