import React, { Component, ChangeEvent, useContext, useState } from 'react';
import { ChangeOpt, UpdateWord } from '../action';
import { singleOpt, singleQue } from '../../interface';
import { totalContext } from '../../Store';
import { Input, Checkbox } from 'antd';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';

const Que: React.SFC<any> = ({ item, getData, index, mustCheck }) => {
    const { state, dispatch } = useContext(totalContext);
    const { opt } = state;
    const [radioChecked, changeChecked] = useState(0);

    const [data, changeData] = useState([]);
    const [word, changeWord] = useState([] as any);
    const [count, changeCount] = useState([]);

    const saveOptData = (parIndex: Number, parentId: Number, queType: string, isMulti: boolean) => {
        if (queType === 'publish') {
            return function (event?: RadioChangeEvent) {
                let obj = {
                    parId: parentId,
                    order: parIndex,
                    index: +(event?.target as HTMLInputElement).value-1,
                    count: 1
                }
                let _data: any;
                if (isMulti) {
                    //多选题 比较是否重复后决定是否添加选项
                    let num = data.findIndex((item: singleOpt) => item.parId === parentId && item.order === parIndex && item.index === +(event?.target as HTMLInputElement).value-1);
                    _data = [...data];
                    if (num !== -1) {
                        _data[num] = obj;
                        changeData(_data);
                    } else {
                        _data.push(obj)
                        changeData(_data);
                    }
                    getData(_data);
                } else {
                    //单选题 因为只有一个答案所以直接用空arr再push所选选项进去
                    _data = [obj];
                    getData(_data);
                }
                let num2 = count.findIndex((item: singleQue) => item.parId === parentId && item.order === parIndex);
                if (num2 === -1) {
                    let _count: any = [...count];
                    _count.push({
                        parId: parentId,
                        order: parIndex
                    });
                    changeCount(_count);
                }
                console.log(_data)
            }
        }
    }

    const saveWordData = (id: number, index: number, queType: string, must: boolean): any => {
        if (queType === 'publish') {
            return function (event?: any) {
                if (must && !(event?.target as HTMLTextAreaElement).value) {
                    console.log('此题必填');
                    mustCheck(false);
                } else {
                    let obj = {
                        parId: id,
                        order: index,
                        type: 'word',
                        answer: (event?.target as HTMLTextAreaElement).value
                    }
                    changeWord([obj]);
                    getData([obj]);
                }
            }
        }
    }

    switch (item.type) {
        case 'single':
            return (
                <div data-id='single'>
                    <p>Q{item.order + 1}单选题</p>
                    <p>{item.question || '未填写问题'}</p>
                    <Radio.Group defaultValue={radioChecked} onChange={saveOptData(index, item.parId as number, 'publish', false)}>
                        {filterState(opt, item.parId as number, item.order).map((item: singleOpt, index2: number) => {
                            return (
                                <Radio key={item.parId + item.index + index2 + 1} value={index2 + 1}>{item.content}</Radio>
                            )
                        })}
                    </Radio.Group>
                </div>
            );
        case 'multi':
            return (
                <div data-id='multi'>
                    <p>Q{item.order + 1}多选题</p>
                    <p>{item.question || '未填写问题'}</p>
                    <Radio.Group defaultValue={radioChecked}>
                        {filterState(opt, item.parId as number, item.order).map((item: singleOpt, index2: number) => {
                            return (
                                <Checkbox key={item.parId + item.index + index2 + 1} value={index2 + 1} onChange={saveOptData(index, item.parId as number, 'publish', true)}>{item.content}</Checkbox>
                            )
                        })}
                    </Radio.Group>
                </div>
            );
        case 'word':
            return (
                <div data-id='word'>
                    <p>Q{item.order + 1}文字题</p>
                    <p>{item.question}</p>
                    <span>{item.must ? '此项必填' : '此项选填'}</span>
                    <Input.TextArea name="" id="" cols={30} rows={10} placeholder="回答内容" onChange={
                        saveWordData(item.parId as number, index, 'publish', item.must)
                    } />
                </div>
            )
        default:
            return <div></div>;
    }
}

const filterState = (data: any, id: number, index: number) => {
    var arr: Array<any> = data.filter((item: singleOpt) => {
        if (item.parId === id && item.order === index) {
            return true;
        } else {
            return false;
        }
    });
    return arr;
}

export default Que;