import React, { Component, Props } from 'react';
import QueItem from './queItem';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { clearQue } from '../action';
import './data.css';
import { dataState, data1, emptyArr, que1, state } from '../../interface';

interface iData {
    data: data1
    que: dataState
    nowQueId: number
    back: Function
}
interface iData2 extends Array<any> {
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

class Data extends Component<iData> {
    constructor(props: iData) {
        super(props);
    }
    selectData(data: dataState, id: number) {
        let obj = {};
        data.forEach((item: data1) => {
            if (item.id === id) obj = item;
        });
        return obj;
    }
    selectQue(id: number, que: dataState) {
        let arr: emptyArr= [];
        que.forEach((item: que1) => {
            if (item.parId === id) {
                arr.push(item);
            }
        });
        arr.sort((a: que1, b: que1) => {
            return a.order! - b.order!;
        });
        return arr;
    }
    render() {
        if (this.props.nowQueId === 0) {
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
                            <p>{this.props.data.name}</p>
                            <span>问卷总提交次数：{this.props.data.submit} 截止日期：{this.props.data.deadline}</span>
                        </div>
                        <div className="queData">
                            {this.selectQue(this.props.nowQueId, this.props.que).map((item: Array<any>, index: number) => (
                                <QueItem
                                    key={this.props.nowQueId + 'data' + index}
                                    item={item}
                                    index={index}
                                    count={this.props.data.submit}
                                />
                            ))}
                        </div>
                        <div className="data-foot">
                            <input type="button" value="返回" onClick={() => this.props.back()} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state: state) => {
    return {
        data: Data.prototype.selectData(state.data as dataState, state.nowQueId as number) as data1,
        que: state.que as dataState,
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

export default connect(mapStateToProps, mapDispatchToProps)(Data)