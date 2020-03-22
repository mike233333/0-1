import React, { createContext, useReducer, Context, Reducer, ProviderProps } from 'react';
import { reducer } from './task';
import { reducer as contentReducer } from './content';
import { listReducer1, listReducer2 } from './list/reducer';
import { CombineReducerProp } from './interface';

//初始store
let initState = JSON.parse(localStorage.getItem('state')!) || {
    list: [
        //默认分类 id设为0
        {
            id: 0,
            catName: "默认分类",
            //list为目录下的子分类 默认分类不可有子分类 故为空
            list: [
                {
                    id: 1,
                    catName: '默认分类子分类1',
                    list: []
                }, {
                    id: 2,
                    catName: '默认分类子分类2',
                    list: []
                }
            ]
        }
        //接下来是后面可以新添加的分类
    ],
    selected: 0,
    selectedTask: 0,
    filter: {
        name: '全部'
    },
    task: [
        {
            parentId: 0,
            taskId: 0,
            title: "默认分类示例",
            time: "1970-01-01",
            done: true,
            content: "任务内容"
        }
    ],
    taskState: '显示'
};
//组合reducer
let reducers = combineReducers({
    list: listReducer1,
    selected: listReducer2,
    filter: reducer.filterSelect,
    task: reducer.taskReducer1,
    selectedTask: reducer.taskReducer2,
    taskState: contentReducer
});

//provider组件
export const totalContext: Context<any> = createContext({});

//combineReducers函数
export function combineReducers(reducers: CombineReducerProp) {
    return function (state: any = {}, action: any): Reducer<any, any> {
        const newState:any = {};
        Object.keys(reducers).forEach(key => {
            const childState = state[key];
            newState[key] = reducers[key](childState, action);
        });
        return newState;
    }
}

export const Providers = (props:ProviderProps<JSX.Element>) => {
    const [state, dispatch] = useReducer(reducers, initState);
    return (
        <totalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </totalContext.Provider>
    );
};
