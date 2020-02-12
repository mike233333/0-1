import React, { Component } from 'react';
import Canvas from './canvas';
import { connect } from 'react-redux';
import { dataState, emptyArr, opt1, state } from '../../interface';

interface QueItem {
    [name: string]: any;
}
class QueItem extends Component<QueItem>{
    constructor(props: QueItem) {
        super(props);
    }
    selectOpt(data: dataState, id: number, index: number) {
        let arr: emptyArr = [];
        data.forEach((item: opt1) => {
            if (item.parId === id && item.order === index) {
                arr.push(item);
            }
        });
        return arr;
    }
    render() {
        return (
            <div>
                <p>Q{this.props.index + 1}{this.props.item.type == 'single' ? '单选题' : this.props.item.type == 'multi' ? '多选题' : '文字题'}</p>
                <p>该问题总提交次数为{this.props.count}次</p>
                <Canvas
                    type={this.props.item.type}
                    opt={this.selectOpt(this.props.opt, this.props.item.parId, this.props.item.order)}
                    que={this.props.item}
                    count={this.props.count}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: state) => {
    return {
        opt: state.opt
    }
}

export default connect(mapStateToProps)(QueItem)