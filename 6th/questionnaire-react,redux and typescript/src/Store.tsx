import React, { createContext, useReducer, Context, Reducer, ProviderProps, Props } from 'react';
import { CombineReducerProp } from './interface';
import { createReducerQue, createReducerOpt, createReducerQueId, createReducerData } from './create/reducer';

//初始化store
let oldState: Storage = JSON.parse(localStorage.getItem('questionnaire-state')!);
let bool: boolean = false;
for (let item in oldState) {
    if ((item !== 'data' && item !== 'que' && item !== 'opt') || !oldState[item]) bool = true;
}
//判断条件storage中存在state数据且里面没有空项 使用sotrage数据 否则使用初始数据
const initialState = bool ? JSON.parse(localStorage.getItem('questionnaire-state')!) : {
    data: [
        {
            id: 1,
            state: 'publish',
            name: 'example',
            //select: false,
            deadline: '2020-12-31',
            submit: 4,
        }
    ],
    que: [
        {
            parId: 1,
            order: 0,
            type: 'single',
            question: '',
            must: true,
            submitCount: 0,
            answer: []
        },
        {
            parId: 1,
            order: 1,
            type: 'word',
            question: '',
            must: true,
            submitCount: 0,
            answer: ['123', '222', '1', '']
        }

    ],
    opt: [
        {
            parId: 1,
            order: 0,
            index: 0,
            content: 'aaaaa',
            count: 2
        }, {
            parId: 1,
            order: 0,
            index: 1,
            content: 'aaa',
            count: 2
        }

    ],
    nowQueId: 0
};

//组合reducer
let reducers = combineReducers({
    que: createReducerQue,
    opt: createReducerOpt,
    nowQueId: createReducerQueId,
    data: createReducerData
});

//provider组件
export const totalContext: Context<any> = createContext({});

//combineReducers函数
export function combineReducers(reducers: CombineReducerProp) {
    return function (state: any = {}, action: { type: string, [name: string]: any }): Reducer<any, { type: string, [name: string]: any }> {
        const newState: any = {};
        Object.keys(reducers).forEach(key => {
            const childState = state[key];
            newState[key] = reducers[key](childState, action);
        });
        return newState;
    }
}

export const Providers = (props: Props<JSX.Element>) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return (
        <totalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </totalContext.Provider>
    );
};
