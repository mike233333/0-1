import React, { Component, useContext, useState, SetStateAction, Dispatch } from 'react';
import { ContentTypes } from '../../constants';
import * as actions from '../actions';
import './style.css';
import { Layout, Input, Button } from 'antd';
import { totalContext } from '../../Store';
import { OnInputChange, ContentThisState, OnFinishFilter, SearchTask, SingleStateTask } from '../../interface';

const searchTask:SearchTask=(taskId:number, task:[SingleStateTask])=> {
    let target;
    for (let i = 0; i < task.length; i++) {
        if (task[i].taskId === taskId) {
            target = task[i];
        }
    }
    return target;
}

const Content = () => {
    const { state, dispatch } = useContext(totalContext);
    const [target, active, taskId, id] = [searchTask(state.selectedTask, state.task), state.taskState, state.selectedTask, state.selected];
    const [thisState, changeState]: [ContentThisState, Dispatch<SetStateAction<ContentThisState>>] = useState(target?{
        title: target!.title,
        time: target!.time,
        content: target!.content
    }:{
        title:'空',
        time:'1970-01-01',
        content:'空'
    });
    console.log(thisState)
    const onInputChange: OnInputChange = (event, item) => {
        let thisState2: ContentThisState = { ...thisState };
        thisState2[item] = (event.target as HTMLInputElement).value;
        changeState(thisState2);
    }
    const onFinishFilter: OnFinishFilter = (target, id, selected) => {
        if (thisState.title.length > 10 || thisState.time.search(/^\d{4}-\d{2}-\d{2}$/) === -1 || thisState.content.length === 0) {
            console.log('格式不符 提交失败');
            return false;
        };
        dispatch(actions.addTask(thisState, id, selected));
        dispatch(actions.display());
    }
    return (
        <div className='content'>
            <Layout style={{ backgroundColor: 'white', height: '100%' }}>
                <Layout.Header className='contentHeader'>
                    {active === ContentTypes.DISPLAY ? (
                        <div>
                            <span className='taskNameTitle'>{thisState.title}</span>
                            <span className='taskNameButtonInDisplay'>
                                <Button onClick={() => taskId || taskId === 0 ? dispatch(actions.edit()) : []}>编辑</Button>
                                <Button onClick={() => dispatch(actions.toggle(taskId, true))}>完成</Button>
                                <Button onClick={() => dispatch(actions.toggle(taskId, false))}>取消完成</Button>
                            </span>
                        </div>
                    ) : (
                            <div className='taskNameInEdit'>
                                <Input className='taskNameInEditInput' type="text" placeholder="可输入十个字符以内" onChange={(event) => onInputChange(event, 'title')} defaultValue={thisState.title} style={{ width: 'auto' }} />
                                <span>
                                    <Button onClick={() => dispatch(actions.display())}>取消</Button>
                                    <Button onClick={() => { onFinishFilter(target!, id, taskId) }}>确认</Button>
                                </span>
                            </div>
                        )}
                </Layout.Header>
                <Layout.Header className='contentHeader'>
                    {active === ContentTypes.DISPLAY ? (
                        <span className='taskNameTitle'>任务日期：<span>{thisState.time}</span></span>
                    ) : (
                            <Input className='taskTime' placeholder="yyyy-mm-dd" onChange={(event) => onInputChange(event, 'time')} defaultValue={thisState.time} addonBefore='任务日期：'></Input>
                        )}
                </Layout.Header>
                <Layout.Content>
                    {active === ContentTypes.DISPLAY ? (
                        <div className='taskNameTitle'>{thisState.content}</div>
                    ) : (
                            <Input.TextArea autoSize={{ minRows: 10 }} placeholder="任务内容" onChange={(event) => onInputChange(event, 'content')} defaultValue={thisState.content} />
                        )}
                </Layout.Content>
            </Layout>
        </div >
    )
}

export default Content;
/*
const mapStateToProps = (state, ownProps) => {
    return {
        target: searchTask(state.selectedTask, state.task),
        active: state.taskState,
        taskId: state.selectedTask,
        id: state.selected
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEdit: () => {
            dispatch(actions.edit())
        },
        onChangeState: (id, bool) => {
            dispatch(actions.toggle(id, bool))
        },
        onCancel: () => {
            dispatch(actions.display())
        },
        onFinish: (obj, id, selected) => {
            if (obj.title.length > 10 || obj.time.search(/^\d{4}-\d{2}-\d{2}$/) === -1 || obj.content.length === 0) return false;
            dispatch(actions.addTask(obj, id, selected));
            dispatch(actions.display())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
*/