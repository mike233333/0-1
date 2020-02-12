import React, { Component } from 'react';
import Que from './que';
import './fill.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitQue, FillQue, FillOpt, AddCount } from '../action';

interface icreate {
    que: any;
    [name: string]: any;
}

class Fill extends Component<icreate> {
    optData: [any?];
    queData: [any?];
    bool: boolean;
    constructor(props: icreate) {
        super(props);
        this.optData = [];
        this.queData = [];
        this.bool = true;
    }
    mustCheck(bool: boolean) {
        this.bool = bool;
    }
    getCompoData() {
        return function (this: any, ...arr: [any?]) {
            //必须在函数内新建并引用this的两个数组 否则for循环内无法读取
            let arr1 = this.optData, arr2 = this.queData;
            for (let i of arr) {
                if (i.type) {
                    let num = arr2.findIndex((item: any) => item.parId === i.parId && item.order === i.order);
                    num !== -1 ? arr2[num] = i : arr2.push(i);
                } else {
                    let num = arr1.findIndex((item: any) => item.parId === i.parId && item.order === i.order && item.index === i.index);
                    num !== -1 ? arr1[num] = i : arr1.push(i);
                }
            }
            this.optData = arr1;
            this.queData = arr2;
        }.bind(this)
    }
    filterQue(data: any, id: number) {
        let arr: any = [];
        data.forEach((item: any) => {
            if (id !== null && item.parId === id) {
                arr.push(item);
            }
        });
        arr.sort((a: any, b: any) => {
            return a.order - b.order;
        });
        return arr;
    }
    getQueState(data: any, id: number) {
        let str = '';
        data.forEach((item: any) => {
            if (item.id === id) {
                str = item.state;
            }
        });
        return str;
    }
    render() {
        if (this.props.nowQueId === 0) {
            return (
                <div className='fill'>
                    <div className='fill-1'>请选择要填写的问卷</div>
                </div>
            )
        }
        return (
            <div className="fill">
                <div className="fill-1">
                    <div className="fill-title">
                        <p>问卷标题</p>
                    </div>
                    <div className='queFill'>
                        <ul>
                            {this.filterQue(this.props.que, this.props.nowQueId).map((item: any, index: number) => (
                                <Que
                                    getData={this.getCompoData()}
                                    queType={this.getQueState(this.props.data, this.props.nowQueId)}
                                    key={this.props.nowQueId + '-' + index}
                                    item={item}
                                    index={index}
                                    mustCheck={this.mustCheck}
                                />
                            )
                            )}
                        </ul>
                    </div>
                    <div className="fill-foot">
                        <input type="button" value="提交问卷" onClick={() => { 
                            this.props.submitQue(this.props.data, this.props.nowQueId, this.queData, this.optData,this.bool) }} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        data: state.data,
        que: state.que,
        nowQueId: state.nowQueId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        submitQue: (data: any, id: number, queData: [any?], optData: [any?], bool: boolean) => {
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
                        } else {
                            console.log('问卷必填内容空缺，提交无效');
                        }
                    } else {
                        console.log('问卷不为发布状态，提交无效');
                    }
                } else {
                }
            });
            window.location.hash = '/list';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fill)