import React, { Component, useEffect, useContext } from 'react';
import Canvas from './canvas';
import { singleOpt } from '../../interface';

interface QueItem {
    [name: string]: any;
}
const QueItem:React.FC<any> = ({item,index,count,opt}) => {
    function selectOpt(data: any, id: number, index: number) {
        let arr: any = [];
        data.forEach((item: singleOpt) => {
            if (item.parId === id && item.order === index) {
                arr.push(item);
            }
        });
        return arr;
    }
    return (
        <div>
            <p>Q{index + 1}{item.type == 'single' ? '单选题' : item.type == 'multi' ? '多选题' : '文字题'}</p>
            <p>该问题总提交次数为{count}次</p>
            <Canvas
                type={item.type}
                opt={selectOpt(opt, item.parId, item.order)}
                que={item}
                count={count}
            />
        </div>
    )
}
/*
const mapStateToProps = (state: any) => {
    return {
        opt: state.opt
    }
}
*/
export default QueItem;