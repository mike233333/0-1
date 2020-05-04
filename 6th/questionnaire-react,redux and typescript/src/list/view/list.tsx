import React, { Component, ChangeEvent, useContext, useState, useEffect } from 'react';
import LiQue from './liQue';
import './list.css';
import { editQue, scanData, fillQue, newItem, removeItem, updateDate } from '../action';
import { List, Row, Col, Checkbox, Button, message } from 'antd';
import { totalContext } from '../../Store';
import { singleData, CheckDate } from '../../interface';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';


const Lists = ({ }) => {
    const { state, dispatch } = useContext(totalContext);
    const [checked, changeChecked] = useState(0);
    const [list, changeList] = useState([]);
    const data = state.data;
    const checkDate: CheckDate = (date) => {
        const nowDate = new Date().getTime();
        if (nowDate <= Date.parse(date)) {
            return true;
        } else {
            return false;
        }
    }
    useEffect(() => {
        data.forEach((item: singleData) => {
            if (!checkDate(item.deadline) && item.state !== 'done') {//此处条件注意要判断item.state是否已经是done 否则将会无限触发dispatch爆栈
                dispatch(updateDate(item.id, 'done'));
            }
        });
    })
    return (
        <section className="list">
            <h1>问卷列表</h1>
            <List
                itemLayout='vertical'
                dataSource={data}
                header={
                    <Row>
                        <Col span={4}>选中</Col>
                        <Col span={6}>问卷名称</Col>
                        <Col span={6}>问卷状态</Col>
                        <Col span={8}>功能区域</Col>
                    </Row>
                }
                footer={
                    <Row>
                        <Col span={4}>
                            <Checkbox indeterminate={!!checked && checked < data.length} checked={data.length === checked} onChange={(event: CheckboxChangeEvent) => {
                                message.warn('功能未添加');
                            }}>all</Checkbox>
                        </Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={8}>
                            <Button onClick={() => {
                                list.forEach((item: number) => dispatch(removeItem(item)));
                                changeChecked(checked - list.length);
                            }}>删除</Button>
                            <Button onClick={() => {
                                dispatch(newItem());
                                window.location.hash = '/create';
                            }}>新建</Button>
                        </Col>
                    </Row>
                }
                renderItem={(item: singleData) => (
                    <List.Item>
                        <LiQue
                            key={item.id}
                            id={item.id}
                            state={item.state}
                            name={item.name}
                            editQue={() => {
                                dispatch(editQue(item.id));
                                window.location.hash = '/create';
                            }}
                            scanData={() => {
                                dispatch(scanData(item.id));
                                window.location.hash = '/data';
                            }}
                            fillQue={() => {
                                dispatch(fillQue(item.id));
                                window.location.hash = '/fill';
                            }}
                            checked={checked}
                            changeChecked={changeChecked}
                            list={list}
                            changeList={changeList}
                        ></LiQue>
                    </List.Item>
                )}
            >
            </List>
        </section>
    )
}

/*
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
*/
export default Lists;