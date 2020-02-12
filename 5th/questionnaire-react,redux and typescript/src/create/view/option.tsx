import React, { JSXElementConstructor } from 'react';
import * as actionTypes from '../actionTypes';
import { updateOpt } from '../action';

interface OptProps {
    removeOpt: any;
    type: string;
    [name: string]: any;
}
const Option: React.FC<OptProps> = ({ removeOpt, type, updateOpt,content }) => {
    switch (type) {
        case 'single':
            return (
                <div>
                    <input type="radio" /><input type="text" placeholder="选项内容" defaultValue={content} onChange={updateOpt} />
                    <input type="button" value="X" onClick={removeOpt} />
                </div>
            )
        case 'multi':
            return (
                <div>
                    <input type="checkbox" /><input type="text" placeholder="选项内容" defaultValue={content} onChange={updateOpt} />
                    <input type="button" value="X" onClick={removeOpt} />
                </div>
            )
        default:
            return (
                <div></div>
            )
    }
}

export default Option;