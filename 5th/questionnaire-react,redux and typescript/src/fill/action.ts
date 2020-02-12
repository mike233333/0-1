import * as actionTypes from './actionType';

export const ChangeOpt = (parIndex: Number, parentId: Number, index: Number, number: number) => ({
    type: actionTypes.SubmitOpt,
    parIndex: parIndex,
    parentId: parentId,
    index: index,
    number: number
});
export const SubmitQue = () => ({
    type: actionTypes.ChangeQue,
    id: null
});
export const UpdateWord = (id: number, index: number, answer: string) => ({
    type: actionTypes.UpdateWord,
    id: id,
    index: index,
    answer: answer
});
export const FillQue = (id: number, index: number, answer: string) => ({
    type: actionTypes.FillQue,
    id: id,
    index: index,
    answer: answer
});
export const FillOpt = (id: number, order: number, index: number, count: number) => ({
    type: actionTypes.FillOpt,
    id: id,
    order: order,
    index: index,
    count: count
});
export const AddCount = (id: number) => ({
    type: actionTypes.AddCount,
    id: id
});