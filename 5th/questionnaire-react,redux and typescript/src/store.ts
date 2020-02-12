import { createStore, combineReducers } from 'redux';
import { createReducer, createReducer2, createReducer3, createReducer4 } from './create/reducer';
import { state } from './interface';

const reducers = combineReducers({
    que: createReducer,
    opt: createReducer2,
    nowQueId: createReducer4,
    data: createReducer3
});

const initialState = JSON.parse(localStorage.getItem('state')!) as state || {
    data: [
        {
            id: 1,
            state: 'publish',
            name: 'example',
            //select: false,
            deadline: '2019-12-31',
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
            content: '',
            count: 2
        }, {
            parId: 1,
            order: 0,
            index: 1,
            content: '',
            count: 2
        }

    ],
    nowQueId: 0
};

export default createStore(reducers, initialState);