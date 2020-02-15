import { Add, Remove, Selected } from './actionTypes';
export const addCat = (name, id) => ({
    type: Add,
    id: Date.parse(new Date()),
    catName: name,
    selectedId: id
});
export const removeCat = (catId) => ({
    type: Remove,
    id: catId
});
export const thingSelected = (catId) => ({
    type: Selected,
    id: catId,
})