import React, { Component, ChangeEvent, useContext } from 'react';
import Option from './option';
import { removeOpt, addOpt, upOpt, downOpt, updateOpt, addQue, removeQue, upQue, downQue, copyQue, updateQue, removeAllOpt } from '../action';
import { Input, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Controller from './controller';
import { totalContext } from '../../Store';
import { FilterState, singleOpt, QueProps } from '../../interface';

/*
<li data-id='single'>
            <p>Q{this.props.index + 1}单选题</p>
            <Input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
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
            <Controller></Controller>
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
        <li data-id='multi'>
            <p>Q{this.props.index + 1}多选题</p>
            <Input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
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
        <li data-id='word'>
            <p>Q{this.props.index + 1}文字题</p>
            <Input type="text" placeholder="题目内容" defaultValue={this.props.item.question} onChange={this.props.updateQue} />
            <TextArea name="" id="" cols={30} rows={10} placeholder="回答内容"></TextArea>
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
*/
const filterState: FilterState = (opt, id, index) => {
    var arr = opt.filter((item: singleOpt) => {
        if (item.parId === id && item.order === index) {
            return true;
        } else {
            return false;
        }
    });
    return arr;
}

const Que: React.FC<QueProps> = ({ index, item }) => {
    const { state, dispatch } = useContext(totalContext);
    const { opt } = state;

    switch (item.type) {
        case 'single':
            return (
                <div data-id='single' className='que'>
                    <p>Q{index + 1}单选题</p>
                    <Input type="text" placeholder="题目内容" defaultValue={item.question} onChange={(event: React.ChangeEvent) => dispatch(updateQue(item.parId, index, (event.target as HTMLInputElement).value))} />
                    {filterState(opt, item.parId, index).map((optItem, optIndex: number) => {
                        return (
                            <Option
                                index={optIndex}
                                key={optItem.parId+optIndex}
                                type={item.type}
                                content={optItem.content}
                                removeOpt={() => dispatch(removeOpt(optItem.order, optItem.parId, optIndex))}
                                updateOpt={(event: React.ChangeEvent) => dispatch(updateOpt(index, item.parId, optIndex, (event.target as HTMLInputElement).value))}
                            />
                        )
                    })}
                    <Controller
                        bool={true}
                        addOpt={() => dispatch(addOpt(index, item.parId))}
                        removeQue={() => {
                            dispatch(removeQue(index, item.parId));
                            dispatch(removeAllOpt(index, item.parId));
                        }}
                        upQue={() => dispatch(upQue(index, item.parId))}
                        downQue={() => dispatch(downQue(index, item.parId))}
                        copyQue={() => dispatch(copyQue(index, item.parId))}
                    />
                </div>
            )
        case 'multi':
            return (
                <div data-id='multi' className='que'>
                    <p>Q{index + 1}多选题</p>
                    <Input type="text" placeholder="题目内容" defaultValue={item.question} onChange={(event: React.ChangeEvent) => dispatch(updateQue(item.parId, index, (event.target as HTMLInputElement).value))} />
                    {filterState(opt, item.parId, index).map((optItem, optIndex: number) => {
                        return (
                            <Option
                                index={optIndex}
                                key={optItem.parId+optIndex}
                                type={item.type}
                                content={optItem.content}
                                removeOpt={() => dispatch(removeOpt(optItem.order, optItem.parId, optIndex))}
                                updateOpt={(event: React.ChangeEvent) => dispatch(updateOpt(index, item.parId, optIndex, (event.target as HTMLInputElement).value))}
                            />
                        )
                    })}
                    <Controller
                        bool={true}
                        addOpt={() => dispatch(addOpt(index, item.parId))}
                        removeQue={() => {
                            dispatch(removeQue(index, item.parId));
                            dispatch(removeAllOpt(index, item.parId));
                        }}
                        upQue={() => dispatch(upQue(index, item.parId))}
                        downQue={() => dispatch(downQue(index, item.parId))}
                        copyQue={() => dispatch(copyQue(index, item.parId))}
                    />
                </div>
            )
        case 'word':
            return (
                <div data-id='word' className='que'>
                    <p>Q{index + 1}文字题</p>
                    <Input type="text" placeholder="题目内容" defaultValue={item.question} onChange={(event: React.ChangeEvent) => dispatch(updateQue(item.parId, index, (event.target as HTMLInputElement).value))} />
                    <TextArea name="" id="" cols={30} rows={10} placeholder="回答内容"></TextArea>
                    <Controller
                        bool={false}
                        addOpt={() => dispatch(addOpt(index, item.parId))}
                        removeQue={() => dispatch(removeQue(index, item.parId))}
                        upQue={() => dispatch(upQue(index, item.parId))}
                        downQue={() => dispatch(downQue(index, item.parId))}
                        copyQue={() => dispatch(copyQue(index, item.parId))}
                    />
                </div>
            )
        default:
            return (
                <div></div>
            )
    }
}

/*
const mapStateToProps = (state: state) => {
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
*/
export default Que;