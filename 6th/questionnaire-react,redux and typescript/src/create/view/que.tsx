import React, { Component, ChangeEvent } from 'react';
import Option from './option';
import { connect } from 'react-redux';
import { removeOpt, addOpt, upOpt, downOpt, updateOpt } from '../action';
import { opt1, dataState, state } from '../../interface';
import { Dispatch } from 'redux';

interface QueProps {
    type: string;
    index: number;
    parId: number;
    opt: any;
    [name: string]: any;
}

interface QueState {
    state: []
}
class Que extends Component<QueProps> {
    constructor(props: QueProps) {
        super(props);
    }
    updateOpt(index: number, id: number, index2: number, fn: Function) {
        //函数柯里化 先在外部存入id等 内部无状态组件传入event
        return function (event?: Event) {
            fn(index, id, index2, (event?.target as HTMLInputElement).value);
        }
    }
    render() {
        switch (this.props.type) {
            case 'single':
                return (
                    <li data-id='single'>
                        <p>Q{this.props.index + 1}单选题</p>
                        <input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
                        {filterState(this.props.opt, this.props.parId, this.props.index).map((item: opt1, index: number) => {
                            return (
                                <Option
                                    key={this.props.parId + '-' + this.props.index + '-' + index}
                                    type={this.props.type}
                                    content={item.content}
                                    removeOpt={() => this.props.removeOpt(this.props.index, this.props.parId, index)}
                                    updateOpt={this.updateOpt(this.props.index, this.props.parId, index, this.props.updateOpt)}
                                />
                            )
                        })}
                        <div data-id="addOpt" className='addOpt' onClick={() => this.props.addOpt(this.props.index, this.props.parId)}>Add Option</div>
                        <div className="create-controller">
                            <span className="controller-up" onClick={() => {
                                this.props.upQue(this.props.index, this.props.parId)
                                this.props.upOpt(this.props.index, this.props.parId)
                            }}>上移</span>
                            <span className="controller-down" onClick={() => {
                                this.props.downQue(this.props.index, this.props.parId)
                                this.props.downOpt(this.props.index, this.props.parId)
                            }}>下移</span>
                            <span className="controller-copy" onClick={() => this.props.copyQue(this.props.index, this.props.parId)}>复用</span>
                            <span className="controller-delete" onClick={() => this.props.removeQue(this.props.index, this.props.parId)}>删除</span>
                        </div>
                    </li>
                )
            case 'multi':
                return (
                    <li data-id='multi'>
                        <p>Q{this.props.index + 1}多选题</p>
                        <input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
                        {filterState(this.props.opt, this.props.parId, this.props.index).map((item: opt1, index: number) => {
                            return (
                                <Option
                                    key={this.props.parId + '-' + this.props.index + '-' + index}
                                    type={this.props.type}
                                    content={item.content}
                                    removeOpt={() => this.props.removeOpt(this.props.index, this.props.parId, index)}
                                    updateOpt={this.updateOpt(this.props.index, this.props.parId, index, this.props.updateOpt)}
                                />
                            )
                        })}
                        <div data-id="addOpt" className='addOpt' onClick={() => this.props.addOpt(this.props.index, this.props.parId)}>Add Option</div>
                        <div className="create-controller">
                            <span className="controller-up" onClick={() => {
                                this.props.upQue(this.props.index, this.props.parId)
                                this.props.upOpt(this.props.index, this.props.parId)
                            }}>上移</span>
                            <span className="controller-down" onClick={() => {
                                this.props.downQue(this.props.index, this.props.parId)
                                this.props.downOpt(this.props.index, this.props.parId)
                            }}>下移</span>
                            <span className="controller-copy" onClick={() => this.props.copyQue(this.props.index, this.props.parId)}>复用</span>
                            <span className="controller-delete" onClick={() => this.props.removeQue(this.props.index, this.props.parId)}>删除</span>
                        </div>
                    </li>
                )
            case 'word':
                return (
                    <li data-id='word'>
                        <p>Q{this.props.index + 1}文字题</p>
                        <input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
                        <textarea name="" id="" cols={30} rows={10} placeholder="回答内容"></textarea>
                        <span>
                            <p><input type="checkbox" />此项必填</p>
                        </span>
                        <div className="create-controller">
                            <span className="controller-up" onClick={() => {
                                this.props.upQue(this.props.index, this.props.parId)
                                this.props.upOpt(this.props.index, this.props.parId)
                            }}>上移</span>
                            <span className="controller-down" onClick={() => {
                                this.props.downQue(this.props.index, this.props.parId)
                                this.props.downOpt(this.props.index, this.props.parId)
                            }}>下移</span>
                            <span className="controller-copy" onClick={() => this.props.copyQue(this.props.index, this.props.parId)}>复用</span>
                            <span className="controller-delete" onClick={() => this.props.removeQue(this.props.index, this.props.parId)}>删除</span>
                        </div>
                    </li>
                )
            default:
                break;
        }
    }
}

const filterState = (data: dataState, id: number, index: number) => {
    var arr = data.filter((item: any) => {
        if (item.parId === id && item.order === index) {
            return true;
        } else {
            return false;
        }
    });
    return arr;
}

const mapStateToProps = (state:state) => {
    return {
        opt: state.opt,
        que: state.que
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeOpt: (parIndex: number, parentId: number, index: number) => {
            dispatch(removeOpt(parIndex, parentId, index));
        },
        addOpt: (parIndex: number, parentId: number) => {
            dispatch(addOpt(parIndex, parentId))
        },
        upOpt: (parIndex: number, parentId: number) => {
            dispatch(upOpt(parIndex, parentId))
        },
        downOpt: (parIndex: number, parentId: number) => {
            dispatch(downOpt(parIndex, parentId))
        },
        updateOpt: (parIndex: number, parentId: number, index: number, content: string) => {
            dispatch(updateOpt(parIndex, parentId, index, content))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Que);