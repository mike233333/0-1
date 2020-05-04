import React, { Component, Props, useContext, useEffect } from 'react';
import QueItem from './queItem';
import { clearQue } from '../action';
import './data.css';
import { totalContext } from '../../Store';

interface any2 extends Array<any> {
    [index: number]: {
        id: number
        name: string
        submit: number
        deadline: string
    }
}
interface Que extends Array<any> {
    [index: number]: {
        parId: number
        order: number
    }
}

const Data = () => {
    const { state, dispatch } = useContext(totalContext);
    const { data, que, opt, nowQueId } = state;
    function selectData(data: any, id: number) {
        let obj = {};
        data.forEach((item: any) => {
            if (item.id === id) obj = item;
        });
        return obj;
    }
    function selectQue(id: number, que: any) {
        let arr: any = [];
        que.forEach((item: any) => {
            if (item.parId === id) {
                arr.push(item);
            }
        });
        arr.sort((a: any, b: any) => {
            return a.order! - b.order!;
        });
        return arr;
    }
    let nowData: any = selectData(data, nowQueId);
    if (nowQueId === 0||JSON.stringify(nowData)==='{}') {
        return (
            <div className='data'>
                <div className="data-1">
                    请选择要查看数据的页面
                    </div>
            </div>
        )
    } else {
        return (
            <div className="data">
                <div className="data-1">
                    <div className="data-title">
                        <p>{nowData.name||'未填写'}</p>
                        <span>问卷总提交次数：{nowData.submit} 截止日期：{nowData.deadline||'未填写'}</span>
                    </div>
                    <div className="queData">
                        {selectQue(nowQueId, que).map((item: Array<any>, index: number) => (
                            <QueItem
                                key={nowQueId + 'data' + index}
                                item={item}
                                index={index}
                                count={nowData.submit}
                                opt={opt}
                            />
                        ))}
                    </div>
                    <div className="data-foot">
                        <input type="button" value="返回" onClick={() => {
                            window.location.hash = '/list';
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
/*
const mapStateToProps = (state: state) => {
    return {
        data: Data.prototype.selectData(state.data as any, state.nowQueId as number) as an,
        que: state.que as any,
        nowQueId: state.nowQueId as number
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        back: () => {
            window.location.hash = '/list';
            dispatch(clearQue());
        }
    }
}
*/
export default Data;