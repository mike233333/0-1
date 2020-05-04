import React from 'react';
import { List, Checkbox, Row, Col, Button } from 'antd';


interface iLiQue {
    [name: string]: any;
}
const LiQue = ({ id, state, name, editQue, scanData, fillQue, checked, changeChecked, list, changeList }: iLiQue) => {
    return (
        <Row data-id={id}>
            <Col span={4}>
                <Checkbox onChange={event => event.target.checked ? (changeChecked(checked + 1), changeList([...list, id])) :
                    (changeChecked(checked - 1), changeList(list.filter((item: number) => item !== id)))}></Checkbox>
            </Col>
            <Col span={6}>{name}</Col>
            <Col span={6}>{state}</Col>
            <Col span={8}>
                {state === 'ready' ? (
                    <div>
                        <Button onClick={editQue}>编辑</Button>
                    </div>
                ) : state === 'publish' ?
                        (
                            <div>
                                <Button onClick={scanData}>数据</Button>
                                <Button onClick={fillQue}>填写</Button>
                            </div>
                        ) : (
                            <div>
                                <Button onClick={scanData}>数据</Button>
                            </div>
                        )
                }
            </Col>
        </Row>
    )
}

export default LiQue;