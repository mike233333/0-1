import React, { ChangeEvent } from 'react';
import { opt1 } from '../../interface';

interface iOpt {
    item: opt1;
    changeOpt: (event?:ChangeEvent)=>undefined;
    type: string
}

const Opt = ({ item, changeOpt, type }: iOpt) => {
    switch (type) {
        case 'single':
            return (
                <div>
                    <p><input type="radio" value={item.index + 1} name={'0'} onChange={changeOpt} />{item.content || '未填写选项内容'}</p>
                </div>
            );
        case 'multi':
            return (
                <div>
                    <p><input type="checkbox" value={item.index + 1} name={'0'} onChange={changeOpt} />{item.content || '未填写选项内容'}</p>
                </div>
            );
        default:
            return (<div></div>);
    }
}

export default Opt;