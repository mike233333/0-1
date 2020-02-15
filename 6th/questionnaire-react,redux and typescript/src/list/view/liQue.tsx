import React from 'react';

interface iLiQue {
    id: number;
    state: string;
    name: string;
    [name: string]: any;
}

const LiQue = ({ id, state, name, editQue, scanData, fillQue }: iLiQue) => {
    return (
        <tr data-id={id}>
            <td><input type="checkbox" /></td>
            <td><span>{name}</span></td>
            <td><span>{state}</span></td>
            {state === 'ready' ? <td><input className="edit" type="button" value="编辑" onClick={editQue} /><input type="button" value="查看" onClick={fillQue} /></td> :
                <td><input className="edit" type="button" value="数据" onClick={scanData} /><input type="button" value="查看" onClick={fillQue} /></td>}
        </tr>
    )
}

export default LiQue;