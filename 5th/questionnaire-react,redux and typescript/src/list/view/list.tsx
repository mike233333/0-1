import React, { Component, ChangeEvent } from 'react';
import LiQue from './liQue';
import './list.css';
import { connect } from 'react-redux';
import { editQue, scanData, fillQue, newItem, removeItem } from '../action';
import { dataState, state, data1 } from '../../interface';
import { Dispatch } from 'redux';

interface iList {
    data: dataState
    [name: string]: any
}

class List extends Component<iList> {
    constructor(props: iList) {
        super(props);
    }
    render() {
        return (
            <div className="list">
                <section>
                    <h1>问卷列表</h1>
                    <table className="queList">
                        <thead>
                            <tr>
                                <td>选中</td>
                                <td>问卷名称</td>
                                <td>问卷状态</td>
                                <td>功能区域</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((item: data1) => (
                                <LiQue
                                    key={item.id}
                                    id={item.id}
                                    state={item.state as string}
                                    name={item.name as string}
                                    editQue={() => this.props.editQue(item.id)}
                                    scanData={() => this.props.scanData(item.id)}
                                    fillQue={() => this.props.fillQue(item.id)}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><input className='selectAll' type="checkbox" onChange={selectInput} />全选</td>
                                <td></td>
                                <td><input type="button" className="deleteQue" value="删除问卷" onClick={() => {
                                    let arr = document.querySelectorAll('tbody input:checked');
                                    arr.forEach((item: Element) => {
                                        let id = item.parentElement!.parentElement!.getAttribute('data-id');
                                        this.props.removeItem(Number(id));
                                    })
                                }} /></td>
                                <td><input type="button" className="createQue" value="新建问卷" onClick={this.props.newItem} /></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </div>
        )
    }
}

const selectInput: (event: ChangeEvent) => void = (event) => {
    let listTbody = document.getElementsByTagName('tbody')[0];
    if ((event.target as HTMLInputElement).checked) {
        (listTbody.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>).forEach((item) => { item.checked = true });
    } else {
        (listTbody.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>).forEach((item) => { item.checked = false });
    }
}

const mapStateToProps = (state: state) => {
    return {
        data: state.data as dataState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        editQue: (id: number) => {
            dispatch(editQue(id));
            window.location.hash = '/create';
        },
        scanData: (id: number) => {
            dispatch(scanData(id));
            window.location.hash = '/data';
        },
        fillQue: (id: number) => {
            dispatch(fillQue(id));
            window.location.hash = '/fill';
        },
        newItem: () => {
            dispatch(newItem());
            window.location.hash = '/create';
        },
        removeItem: (id: number) => {
            dispatch(removeItem(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)