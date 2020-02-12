import React, { ChangeEvent } from 'react';
import './create.css';
import Que from './que';
import { connect } from 'react-redux';
import { addQue, removeQue, upQue, downQue, copyQue, saveQue, submitQue, clearQue, updateQue, createItem, justOrder } from '../action';
import Calendar from './Calendar.js';
import { newItem } from '../../list/action';
import { dataState, que1, state } from '../../interface';
import { Dispatch } from 'redux';


interface icreate {
    que: dataState
    nowQueId: number
    [name: string]: any
}

let title = '';
let deadline = '';

const saveTitle = (event?: ChangeEvent) => {
    title = (event?.target as HTMLInputElement).value;
}

const saveDeadline = (event?: ChangeEvent) => {
    deadline = (event?.target as HTMLInputElement).value;
}

const win = window;
const Create = ({ que, nowQueId, addQue, removeQue, upQue, downQue, copyQue, saveQue, submitQue, clearQue, updateQue, newItem }: icreate) => {
    if (nowQueId === 0) {
        return (
            <div className='create'>
                <div className='create-2'>
                    <p>点击按钮新建问卷</p>
                    <input type="button" value="新建问卷" onClick={newItem} />
                </div>
            </div>
        )
    }
    return (
        <div className="create">
            <div className="create-1">
                <div className="create-title"><input type="text" placeholder="问卷标题" onChange={saveTitle} /></div>
                <div className="queAll">
                    <ul data-id={nowQueId}>
                        {
                            filterQue(que, nowQueId).map((item: que1, index: number) => (
                                <Que
                                    key={item.parId + '-' + index}
                                    index={index}
                                    type={item.type}
                                    parId={item.parId}
                                    addQue={addQue}
                                    removeQue={removeQue}
                                    upQue={upQue}
                                    downQue={downQue}
                                    copyQue={copyQue}
                                    item={item}
                                    updateQue={update(item.parId as number, index, updateQue)}
                                />
                            ))
                        }
                    </ul>
                </div>
                <div className="create-add">
                    <ul>
                        <li onClick={() => addQue('single', nowQueId)}>单选题</li>
                        <li onClick={() => addQue('multi', nowQueId)}>多选题</li>
                        <li onClick={() => addQue('word', nowQueId)}>文字题</li>
                    </ul>
                </div>
                <div className="create-foot">
                    <div className="calendar">问卷截止日期<input className="date" type="text" placeholder="点击出现日历" onFocus={showCal} onChange={saveDeadline} />
                        <div className="calendarTable"></div>
                    </div>
                    <div>
                        <input type="button" value="保存问卷" onClick={() => {
                            saveQue(nowQueId, title, deadline);
                            win.location.hash = '/list';
                            clearQue();
                        }} />
                        <input type="button" value="发布问卷" onClick={() => {
                            submitQue(nowQueId, title, deadline);
                            win.location.hash = '/list';
                            clearQue();
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const filterQue = (data: dataState, id: number) => {
    let arr: any = [];
    data.forEach((item: que1) => {
        if (id !== null && item.parId === id) {
            arr.push(item);
        }
    });
    arr.sort((a: que1, b: que1) => {
        return a.order! - b.order!;
    })
    return arr;
}

const showCal = () => {
    var now = new Date();
    var calen = new Calendar(now.getFullYear(), now.getMonth(), now.getDate());
}

const mapStateToProps = (state: state) => {
    return {
        que: state.que as [],
        nowQueId: state.nowQueId as number
    }
}

const update = (id: number, index: number, fn: Function) => {
    return function (event?: Event) {
        fn(id, index, (event?.target as HTMLInputElement).value);
    }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        addQue: (type: String, parentId: Number) => {
            dispatch(addQue(type, parentId))
        },
        removeQue: (index: Number, parentId: Number) => {
            dispatch(removeQue(index, parentId));
            //移除index后还得把后面的index全部减一 防止混乱
            dispatch(justOrder(index, parentId));
        },
        upQue: (index: Number, parentId: Number) => {
            dispatch(upQue(index, parentId))
        },
        downQue: (index: Number, parentId: Number) => {
            dispatch(downQue(index, parentId))
        },
        copyQue: (index: Number, parentId: Number) => {
            dispatch(copyQue(index, parentId))
        },
        saveQue: (id: number, title: string, deadline: string) => {
            dispatch(createItem(id, title, deadline))
            dispatch(saveQue(id));
        },
        submitQue: (id: number, title: string, deadline: string) => {
            dispatch(createItem(id, title, deadline))
            dispatch(submitQue(id))
        },
        clearQue: () => {
            dispatch(clearQue())
        },
        updateQue: (id: number, index: number, content: string) => {
            dispatch(updateQue(id, index, content))
        },
        newItem: () => {
            dispatch(newItem());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)