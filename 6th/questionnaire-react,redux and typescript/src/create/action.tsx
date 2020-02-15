import * as actionTypes from './actionTypes';

export const addQue = (type: String, parentId: Number) => ({
    type: actionTypes.AddQue,
    queType: type,
    parentId: parentId
});
export const removeQue = (index: Number, parentId: Number) => ({
    type: actionTypes.RemoveQue,
    index: index,
    parentId: parentId
});
export const upQue = (index: Number, parentId: Number) => ({
    type: actionTypes.UpQue,
    index: index,
    parentId: parentId
});
export const downQue = (index: Number, parentId: Number) => ({
    type: actionTypes.DownQue,
    index: index,
    parentId: parentId
});
export const copyQue = (index: Number, parentId: Number) => ({
    type: actionTypes.CopyQue,
    index: index,
    parentId: parentId
});


export const addOpt = (parIndex: Number, parentId: Number) => ({
    type: actionTypes.AddOpt,
    parIndex: parIndex,
    parentId: parentId
});
export const upOpt = (parIndex: Number, parentId: Number) => ({
    type: actionTypes.UpOpt,
    parIndex: parIndex,
    parentId: parentId
});
export const downOpt = (parIndex: Number, parentId: Number) => ({
    type: actionTypes.DownOpt,
    parIndex: parIndex,
    parentId: parentId
});
export const removeOpt = (parIndex: Number, parentId: Number, index: Number) => ({
    type: actionTypes.RemoveOpt,
    parIndex: parIndex,
    parentId: parentId,
    index: index
});
export const updateOpt = (parIndex: Number, parentId: Number, index: Number, content: string) => ({
    type: actionTypes.UpdateOpt,
    parIndex: parIndex,
    parentId: parentId,
    index: index,
    content: content
})


export const saveQue = (id: number) => ({
    type: actionTypes.SaveQue,
    id: id
});
export const submitQue = (id: number) => ({
    type: actionTypes.SubmitQue,
    id: id
});
export const doneQue = (id: number) => ({
    type: actionTypes.DoneQue,
    id: id
});
export const clearQue = () => ({
    type: actionTypes.ChangeQue,
    id: null
});
export const updateQue = (id: number, index: number, content: string) => ({
    type: actionTypes.UpdateQue,
    id: id,
    index: index,
    content: content
});

export const createItem = (id: number, title: string, deadline: string) => ({
    type: actionTypes.NewItem,
    id: id,
    title: title,
    deadline: deadline
});

export const justOrder = (index: Number, parentId: Number) => ({
    type: actionTypes.JustQueOrder,
    index: index,
    id: parentId
});