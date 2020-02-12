import { Add, Remove, Selected } from './actionTypes';
//深度复制方法
var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}
const listReducer1 = (state = [], action) => {
    switch (action.type) {
        case Add: {
            var _state = clone(state);
            if (action.selectedId||action.selectedId===0) {
                (function getTree(item) {
                    for (let i = 0; i < item.length; i++) {
                        if (item[i].id === action.selectedId) {
                            item[i].list.push({
                                id: action.id,
                                catName: action.catName,
                                list: []
                            });
                        }
                        if (item[i].list.length !== 0) {
                            getTree(item[i].list);
                        }
                    }
                })(_state);
            } else {
                _state.push({
                    id: action.id,
                    catName: action.catName,
                    list: []
                })
            }
            return _state;
        }
        case Remove: {
            var state2 = clone(state);
            (function getTree(item) {
                for (let i = 0; i < item.length; i++) {
                    if (item[i].list.length !== 0) {
                        getTree(item[i].list);
                    }
                    if (item[i].id === action.id) {
                        item.splice(i, 1);
                    };
                }
            })(state2);
            return state2;
        }
        default: {
            return state;
        }
    }
}
const listReducer2 = (state = [], action) => {
    if (action.type === Selected) {
        return action.id;
    } else {
        return state;
    }
}
export { listReducer1, listReducer2 };