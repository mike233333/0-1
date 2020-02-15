import React, { Component, ChangeEvent } from 'react';
import Opt from './opt';
import { connect } from 'react-redux';
import { ChangeOpt, UpdateWord } from '../action';
import { Dispatch } from 'redux';
import { que1, dataState, opt1, state } from '../../interface';

interface iQue {
    item: que1;
    opt: dataState;
    index: number;
    [name: string]: any;
}

class Que extends Component<iQue> {
    data: Array<any>;
    word: Object;
    count: Array<any>;
    constructor(props: iQue) {
        super(props);
        this.data = [];
        this.word = {};
        this.count = [];
    }
    saveOptData(parIndex: Number, parentId: Number, index: Number, queType: string) {
        if (queType === 'publish') {
            return function (this: any, event?: ChangeEvent) {
                let obj = {
                    parId: parentId,
                    order: parIndex,
                    index: index,
                    count: 0
                }
                if ((event?.target as HTMLInputElement).checked) {
                    obj.count += 1;
                } else {
                    obj.count = (obj.count === 0 ? 0 : obj.count - 1);
                }
                let num = this.data.findIndex((item: opt1) => item.parId === parentId && item.order === parIndex && item.index === index);
                if (num !== -1) {
                    this.data[num] = obj;
                } else {
                    this.data.push(obj);
                }
                this.props.getData(...this.data);
                let num2 = this.count.findIndex((item: que1) => item.parId === parentId && item.order === parIndex);
                if (num2 === -1) {
                    this.count.push({
                        parId: parentId,
                        order: parIndex
                    });
                }
            }.bind(this);
        }
    }
    saveWordData(id: number, index: number, queType: string, must: boolean): any {
        if (queType === 'publish') {
            return function (this: any, event?: ChangeEvent) {
                if (must && !(event?.target as HTMLTextAreaElement).value) {
                    console.log('此题必填');
                    this.props.mustCheck(false);
                } else {
                    let obj = {
                        parId: id,
                        order: index,
                        type: 'word',
                        answer: (event?.target as HTMLTextAreaElement).value
                    }
                    this.word = obj;
                    this.props.getData(this.word);
                }
            }.bind(this);
        }
    }
    changeOption(parIndex: Number, parentId: Number, index: Number, fn: Function, queType: string) {
        if (queType === 'publish') {
            return function (event?: ChangeEvent) {
                if ((event?.target as HTMLInputElement).checked) {
                    fn(parIndex, parentId, index, 1);
                } else {
                    fn(parIndex, parentId, index, -1);
                }
            }
        }
    }
    updateWordAnswer(id: number, index: number, fn: Function, queType: string): any {
        if (queType === 'publish') {
            return function (event?: ChangeEvent) {
                fn(id, index, (event?.target as HTMLTextAreaElement).value);
            }
        }
    }
    render() {
        switch (this.props.item.type) {
            case 'single':
                return (
                    <li data-id='single'>
                        <p>Q{this.props.index + 1}单选题</p>
                        <p>{this.props.item.question || '未填写问题'}</p>
                        {filterState(this.props.opt, this.props.item.parId as number, this.props.index).map((item: opt1, index: number) => {
                            return (
                                <Opt
                                    key={this.props.item.parId + '-' + this.props.item.order + '-' + index}
                                    item={item}
                                    type={this.props.item.type as string}
                                    changeOpt={//this.changeOption(this.props.index, this.props.item.parId, index, this.props.changeOpt, this.props.queType)
                                        this.saveOptData(this.props.index, this.props.item.parId as number, index, this.props.queType) as (event?: ChangeEvent) => undefined
                                    }
                                />
                            )
                        })}
                    </li>
                );
            case 'multi':
                return (
                    <li data-id='multi'>
                        <p>Q{this.props.index + 1}多选题</p>
                        <p>{this.props.question}</p>
                        {filterState(this.props.opt, this.props.item.parId as number, this.props.index).map((item: opt1, index: number) => {
                            return (
                                <Opt
                                    item={item}
                                    type={this.props.item.type as string}
                                    changeOpt={//this.changeOption(this.props.index, this.props.item.parId, index, this.props.changeOpt, this.props.queType)
                                        this.saveOptData(this.props.index, this.props.item.parId as number, index, this.props.queType) as (event?: ChangeEvent) => undefined
                                    }
                                />
                            )
                        })}
                    </li>
                );
            case 'word':
                return (
                    <li data-id='word'>
                        <p>Q{this.props.index + 1}文字题</p>
                        <p>{this.props.item.question}</p>
                        <span>{this.props.item.must ? '此项必填' : '此项选填'}</span>
                        <textarea name="" id="" cols={30} rows={10} placeholder="回答内容" onChange={//this.updateWordAnswer(this.props.item.parId, this.props.index, this.props.updateWord, this.props.queType)
                            this.saveWordData(this.props.item.parId as number, this.props.index, this.props.queType, this.props.must)
                        }></textarea>
                    </li>
                )
            default:
                return <div></div>;
        }
    }
}

const filterState = (data: dataState, id: number, index: number) => {
    var arr: Array<any> = data.filter((item: opt1) => {
        if (item.parId === id && item.order === index) {
            return true;
        } else {
            return false;
        }
    });
    return arr;
}

const mapStateToProps = (state: state) => {
    return {
        opt: state.opt as dataState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeOpt: (parIndex: Number, parentId: Number, index: Number, number: number) => {
            dispatch(ChangeOpt(parIndex, parentId, index, number))
        },
        updateWord: (id: number, index: number, answer: string) => {
            dispatch(UpdateWord(id, index, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Que)