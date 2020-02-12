import * as actionTypes from './actionTypes';
import * as actionTypesInList from '../list/actionTypes';
import { action1, que1, emptyObj, opt1, emptyArr, data1 } from '../interface';

const createReducer = (state = [], action: action1) => {
    switch (action.type) {
        case actionTypes.AddQue: {
            let count = 0;
            state.map((item: que1) => {
                if (item.parId === action.parentId) {
                    count++;
                };
            });
            if (count >= 10) {
                console.log('问题最多十个');
                return false;
            }
            return [
                ...state,
                {
                    parId: action.parentId,
                    order: count,
                    type: action.queType,
                    question: '',
                    must: true,
                    submitCount: 0,
                    answer: ''
                }
            ];
        }
        case actionTypes.RemoveQue: {
            return state.filter((item: que1) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    return false;
                } else {
                    return true;
                }
            });
        }
        case actionTypes.UpQue: {
            //先把目标问题取出 然后插入过滤掉该问题的新数组
            let arr = JSON.parse(JSON.stringify(state));
            let obj: emptyObj = {}, obj2: emptyObj = {};
            if (action.index === 0) {
                console.log('上面没了');
                return arr;
            }
            arr.forEach((item: que1, index: number) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    obj = arr[index];
                }
                if (item.parId === action.parentId && item.order === action.index! - 1) {
                    obj2 = arr[index];
                }
            });
            obj.order--;
            obj2.order++;
            arr.forEach((item: que1) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    item = obj;
                }
            });
            arr.forEach((item: any) => {
                if (item.parId === action.parentId && item.order === action.index! - 1) {
                    item = obj2;
                }
            });
            return arr;
        }
        case actionTypes.DownQue: {
            let arr = JSON.parse(JSON.stringify(state));
            let obj: emptyObj = {}, obj2: emptyObj = {};
            if (action.index === arr.length - 1) {
                console.log('下面没了');
                return arr;
            }
            arr.forEach((item: que1, index: number) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    obj = arr[index];
                }
                if (item.parId === action.parentId && item.order === action.index! + 1) {
                    obj2 = arr[index];
                }
            });
            obj.order++;
            obj2.order--;
            arr.forEach((item: que1) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    item = obj;
                }
            });
            arr.forEach((item: que1) => {
                if (item.parId === action.parentId && item.order === action.index! + 1) {
                    item = obj2;
                }
            });
            return arr;
        }
        case actionTypes.CopyQue: {
            let arr = JSON.parse(JSON.stringify(state));
            let obj: emptyObj = {};
            if (arr.length === 10) {
                console.log('问题最多十个');
                return arr;
            }
            arr.forEach((item: que1) => {
                if (item.parId === action.parentId && item.order === action.index) {
                    obj = item;
                }
            });
            obj.order = arr.length;
            arr.push(obj);
            return arr;
        }
        case actionTypes.UpdateQue: {
            return state.map((item: que1) => {
                if (item.parId === action.id && item.order === action.index) {
                    return { ...item, question: action.content };
                } else {
                    return item;
                }
            });
        }
        case actionTypes.UpdateWord: {
            return state.map((item: que1) => {
                if (item.parId === action.id && item.order === action.index) {
                    return { ...item, answer: action.answer };
                } else {
                    return item;
                }
            });
        }
        case actionTypes.FillQue: {
            return state.map((item: que1) => {
                if (item.parId === action.id && item.order === action.index) {
                    return { ...item, answer: [...item.answer!, action.answer] };
                } else {
                    return item;
                }
            })
        }
        case actionTypes.JustQueOrder: {
            return state.map((item: que1) => {
                if (item.parId === action.id && item.order! > action.index!) {
                    return { ...item, order: item.order! - 1 };
                }
                return item;
            });
        }
        default:
            return state;
    }
}

const createReducer2 = (state = [], action: action1) => {
    switch (action.type) {
        case actionTypes.AddOpt: {
            let index: number = 0;
            state.forEach((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex) {
                    index++;
                }
            })
            if (index === 4) return state;
            return [
                ...state,
                {
                    parId: action.parentId,
                    order: action.parIndex,
                    index: index,
                    content: '',
                    answer: ''
                }
            ]
        }
        case actionTypes.RemoveOpt: {
            let arr = state.filter((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex) {
                    return item.index !== action.index;
                } else {
                    return true;
                }
            });
            arr.forEach((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex) {
                    if (item.index >= action.index!) item.index--;
                }
            })
            return arr;
        }
        case actionTypes.UpOpt: {
            let obj: emptyArr = [], obj2: emptyArr = [];
            let arr: Array<any> = state.filter((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex) {
                    obj.push(item);
                    return false;
                } else if (item.parId === action.parentId && item.order === action.parIndex! - 1) {
                    obj2.push(item)
                    return false;
                }
                return true;
            });
            obj.forEach((item: opt1) => {
                item.order--;
            });
            obj2.forEach((item: opt1) => {
                item.order++;
            })
            arr.push(...obj, ...obj2);
            return arr;
        }
        case actionTypes.DownOpt: {
            let obj: emptyArr = [], obj2: emptyArr = [];
            let arr: Array<any> = state.filter((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex) {
                    obj.push(item);
                    return false;
                } else if (item.parId === action.parentId && item.order === action.parIndex! + 1) {
                    obj2.push(item)
                    return false;
                }
                return true;
            });
            obj.forEach((item: opt1) => {
                item.order++;
            });
            obj2.forEach((item: opt1) => {
                item.order--;
            })
            arr.push(...obj, ...obj2);
            return arr;
        }
        case actionTypes.UpdateOpt: {
            return state.map((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex && item.index === action.index) {
                    return { ...item, content: action.content };
                } else {
                    return item;
                }
            });
        }
        case actionTypes.SubmitOpt: {
            return state.map((item: opt1) => {
                if (item.parId === action.parentId && item.order === action.parIndex && item.index === action.index) {
                    if (item.count + action.number! < 0) {
                        return item;
                    } else {
                        return { ...item, count: item.count + action.number! };
                    }
                } else {
                    return item;
                }
            });
        }
        case actionTypes.FillOpt: {
            return state.map((item: opt1) => {
                if (item.parId === action.id && item.order === action.order && item.index === action.index) {
                    return { ...item, count: item.count + action.count! };
                } else {
                    return item;
                }
            });
        }
        default:
            return state;
    }
}
const createReducer3 = (state = [], action: action1) => {
    switch (action.type) {
        case actionTypes.SaveQue:
            return state.map((item: data1) => {
                return item.id === action.id ? { ...item, state: 'ready' } : item;
            });
        case actionTypes.SubmitQue:
            return state.map((item: data1) => {
                return item.id === action.id ? { ...item, state: 'publish' } : item;
            });
        case actionTypes.RemoveItem:
            return state.filter((item: data1) => {
                return item.id !== action.id;
            });
        case actionTypes.NewItem:
            if (state.find((item: data1) => item.id === action.id)) {
                return state;
            }
            return [
                ...state,
                {
                    id: action.id,
                    state: 'done',
                    name: action.title,
                    deadline: action.deadline,
                    submit: 0
                }
            ];
        case actionTypes.AddCount:
            return state.map((item: data1) => {
                return item.id === action.id ? { ...item, submit: item.submit! + 1 } : item;
            });
        default:
            return state;
    }
}

const createReducer4 = (state = [], action: action1) => {
    switch (action.type) {
        case actionTypes.ChangeQue:
            return action.id;
        default:
            return state;
    }
}
export { createReducer, createReducer2, createReducer3, createReducer4 };