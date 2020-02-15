import { createStore, combineReducers } from 'redux';
import { listReducer1, listReducer2 } from './list';
import { reducer } from './task';
import { reducer as contentReducer } from './content';
//const win = window;

const reducers = combineReducers({
    list: listReducer1,
    selected: listReducer2,
    filter: reducer.filterSelect,
    task: reducer.taskReducer1,
    selectedTask: reducer.taskReducer2,
    taskState: contentReducer
});

const initialState = JSON.parse(localStorage.getItem('state'))||{
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
export default createStore(reducers, initialState);