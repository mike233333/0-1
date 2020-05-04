import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import './create.css';
import Que from './que';
import { List, Button, Input, Calendar, DatePicker, message } from 'antd';
import { totalContext } from '../../Store';
import { newItem } from '../../list/action';
import { singleQue, arrayData, singleData, arrayQue, FilterQue, FilterData } from '../../interface';
import { addQue, saveQue, clearQue, submitQue, createItem } from '../action';


const filterQue: FilterQue = (que, id) => {
    let arr: arrayQue = [];
    que.forEach((item: singleQue) => {
        if (id !== null && item.parId === id) {
            arr.push(item);
        }
    });
    arr.sort((a: singleQue, b: singleQue) => {
        return a.order - b.order;
    })
    return arr;
}
const filterData: FilterData = (data, id) => {
    let bool: boolean = true;
    data.forEach((item: singleData) => {
        if (id !== null && item.id === id) {
            bool = item.state === 'ready' ? true : false;
        }
    });
    return bool;
}

const Create = ({ }) => {
    const { state, dispatch } = useContext(totalContext);
    const { data, que, nowQueId } = state;
    let [title, changeTitle] = useState('');
    let [deadline, changeDeadline] = useState('');
    if (nowQueId === 0 || !filterData(data, nowQueId)) {
        return (
            <div className='create1'>
                <div className='create1-1'>
                    <p>点击按钮新建问卷</p>
                    <Button onClick={() => dispatch(newItem())}>新建问卷</Button>
                </div>
            </div>
        )
    }
    return (
        <div className="create2">
            <div className="create2-1">
                <div className="create-title"><Input type="text" placeholder="问卷标题" onChange={(event: React.ChangeEvent) => changeTitle((event.target as HTMLInputElement).value)} /></div>
                <div className="queAll">
                    <List
                        itemLayout='vertical'
                        dataSource={filterQue(que, nowQueId)}
                        renderItem={(item: singleQue, index: number) => (
                            <List.Item>
                                <Que
                                    key={item.parId}
                                    index={index}
                                    item={item}
                                />
                            </List.Item>
                        )}
                    ></List>
                </div>
                <div className="create-add">
                    <Button onClick={() => dispatch(addQue('single', nowQueId))}>单选题</Button>
                    <Button onClick={() => dispatch(addQue('multi', nowQueId))}>多选题</Button>
                    <Button onClick={() => dispatch(addQue('word', nowQueId))}>文字题</Button>
                </div>
                <div className="create-foot">
                    <p>问卷截止时间：<DatePicker onChange={(date, dateString) => changeDeadline(dateString)}></DatePicker></p>
                    <Button onClick={() => {
                        const nowDate = new Date().getTime();
                        if (!deadline) {
                            message.error('必填项空缺');
                        } else if (nowDate < Date.parse(deadline)) {
                            dispatch(createItem(nowQueId, title, deadline));
                            dispatch(saveQue(nowQueId));
                            window.location.hash = '/list';
                            dispatch(clearQue());
                            message.success('保存成功');
                        } else {
                            message.error('截止时间小于当前时间');
                        }
                    }}>保存问卷</Button>
                    <Button onClick={() => {
                        const nowDate = new Date().getTime();
                        if (!deadline) {
                            message.error('必填项空缺');
                        } else if (nowDate < Date.parse(deadline)) {
                            dispatch(createItem(nowQueId, title, deadline));
                            dispatch(submitQue(nowQueId));
                            window.location.hash = '/list';
                            dispatch(clearQue());
                            message.success('保存成功');
                        } else {
                            message.error('截止时间小于当前时间');
                        }
                    }
                    }>发布问卷</Button>
                </div>
            </div>
        </div>
    )
}

/*
const mapStateToProps = (state: state) => {
    return {
        que: state.que as [],
        nowQueId: state.nowQueId as number
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
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
*/

export default Create;