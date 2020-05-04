import React from 'react';
import { Button, message } from 'antd';
import { ControllerProps } from '../../interface';

//bool用于分辨选择题和文字题 文字题没有选项
const Controller: React.SFC<ControllerProps> = ({ bool, addOpt, removeQue, upQue, downQue, copyQue }) => {
    return (
        <div className='controller'>
            {bool ? <Button onClick={addOpt}>添加选项</Button> : null}
            <Button onClick={()=>message.warn('功能未添加')}>题目上移</Button>
            <Button onClick={()=>message.warn('功能未添加')}>题目下移</Button>
            <Button onClick={()=>message.warn('功能未添加')}>题目复用</Button>
            <Button onClick={removeQue}>题目删除</Button>
        </div>
    )
}
export default Controller;