import React, { Component, useContext, useEffect, useState } from 'react';
import Que from './que';
import './fill.css';
import { SubmitQue, FillQue, FillOpt, AddCount } from '../action';
import { totalContext } from '../../Store';
import { List, Input, message } from 'antd';
import { singleQue, FilterQue, FilterData, singleData, FilterSingleData } from '../../interface';
import { clearQue } from '../../create/action';

const filterQue: FilterQue = (que, id) => {
    let arr: Array<singleQue> = [];
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
            bool = item.state !== 'done' ? true : false;
        }
    });
    return bool;
}
const filterSingleData: FilterSingleData = (data, nowQueId) => {
    let obj: any = {};
    data.forEach((item: singleData) => {
        if (item.id === nowQueId) {
            obj = item;
        }
    });
    return obj;
}
const Fill = () => {
    const { state, dispatch } = useContext(totalContext);
    const { data, que, nowQueId } = state;
    const nowData = filterSingleData(data, nowQueId);

    const [queData, changeQueData] = useState([]);
    const [optData, changeOptData] = useState([]);
    const [bool, changeBool] = useState(true);

    const getCompoData = () => {
        return function (this: any, arr: any) {
            //必须在函数内新建并引用this的两个数组 否则for循环内无法读取
            let arr1: any = [...optData], arr2: any = [...queData];
            for (let i of arr) {
                if (i.type) {
                    let num = arr2.findIndex((item: any) => item.parId === i.parId && item.order === i.order);
                    num !== -1 ? arr2[num] = i : arr2.push(i);
                } else {
                    arr1=[i];
                }
            }
            changeOptData(arr1);
            //queData是提交文字题word的内容 集成在que中
            changeQueData(arr2);
        }
    }

    const mustCheck = (bool: boolean) => {
        changeBool(bool);
    }

    const submitAll = (data: any, id: number, queData: any, optData: any, bool: boolean) => {
        data.forEach((item: any) => {
            if (item.id === id) {
                if (item.state === 'publish') {
                    if (bool) {
                        dispatch(SubmitQue());
                        queData.forEach((item: any) => {
                            dispatch(FillQue(item.parId, item.order, item.answer));
                        });
                        dispatch(AddCount(id));
                        optData.forEach((item: any) => {
                            dispatch(FillOpt(item.parId, item.order, item.index, item.count))
                        });
                        message.success('提交成功');
                    } else {
                        message.error('问卷必填内容空缺，提交无效');
                    }
                } else {
                    message.error('问卷不为发布状态，提交无效');
                }
            } else {
            }
        });
        window.location.hash = '/list';
    }

    if (nowQueId === 0 || !filterData(data, nowQueId)) {
        return (
            <div className='fill'>
                <div className='fill-1'>请选择要填写的问卷</div>
            </div>
        )
    }
    return (
        <div className="fill">
            <div className="fill-1">
                <p className="fill-title">{nowData.name || '未填写'}</p>
                <List
                    className='queFill'
                    itemLayout='vertical'
                    dataSource={filterQue(que, nowQueId)}
                    renderItem={(item: singleQue, index: number) => (
                        <List.Item>
                            <Que
                                item={item}
                                getData={getCompoData()}
                                index={index}
                                mustCheck={mustCheck}
                            />
                        </List.Item>
                    )}
                >
                </List>
                <div className="fill-foot">
                    <Input type="button" value="提交问卷" onClick={() => submitAll(data, nowQueId, queData, optData, bool)} />
                    <Input type="button" value="返回列表" onClick={() => {
                        dispatch(clearQue());
                        window.location.hash = '/list';
                    }} />
                </div>
            </div>
        </div>
    )

}

export default Fill;