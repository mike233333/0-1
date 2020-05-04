import React, { JSXElementConstructor } from 'react';
import * as actionTypes from '../actionTypes';
import { updateOpt } from '../action';
import { Input, Radio, Button, Checkbox } from 'antd';
import { OptProps } from '../../interface';

const Option: React.SFC<OptProps> = ({ index, removeOpt, type, updateOpt, content }) => {
    switch (type) {
        case 'single':
            return (
                <div>
                    <Radio value={index}>
                        <Input placeholder='选项内容' defaultValue={content} onChange={updateOpt}></Input>
                        <Button onClick={removeOpt}>X</Button>
                    </Radio>
                </div>
            )
        case 'multi':
            return (
                <div className='checkbox'>
                    <Checkbox></Checkbox>
                    <Input placeholder='选项内容' className='checkboxInput' defaultValue={content} onChange={updateOpt}></Input>
                    <Button onClick={removeOpt}>X</Button>
                </div>
            )
        default:
            return (
                <div></div>
            )
    }
}

export default Option;