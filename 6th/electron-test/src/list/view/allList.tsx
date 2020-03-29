import React, { useContext, useState } from 'react';
import UlList from './ulList';
import { addCat, thingSelected, removeCat } from '../actions';
import './style.css';
import { Menu, Layout, Modal, Input, message } from 'antd';
import { totalContext } from '../../Store';
import { ClearSelected, CalTask, SingleStateTask, SingleStateList, FindCatName } from '../../interface';

const AllList = () => {
    let { state, dispatch } = useContext(totalContext);
    let id = state.selected;
    let [statePrompt, changeStatePrompt] = useState(false);
    let [inputValue,changeInputValue]=useState('');

    function btnClick() {
        if (inputValue) {
            console.log(id);
            //onAdd(prom, id);
            dispatch(addCat(inputValue, id));
            message.success('创建分类成功');
        }
    }
    //查找当前选定分类
    const findCatName:FindCatName=(id,data)=>{
        let name:string='';
        function render(data:[SingleStateList]){
            data.forEach((item:SingleStateList)=>{
                if(item.id===id){
                    name=item.catName;
                }
                if(item.list&&item.list.length!==0){
                    render(item.list);
                }
            });
        }
        render(data);
        return name;
    }
    //计算任务数量
    const calTask: CalTask = (state, bool) => {
        //bool为计算 所有/未完成 开关
        if (bool) {
            return state.task.length;
        } else {
            let num = 0;
            state.task.forEach((item: SingleStateTask) => {
                num += item.done ? 0 : 1;
            });
            return num;
        }
    }
    return (
        <div className='list' >
            <Modal
                title='新建分类'
                visible={statePrompt}
                onOk={(event)=>{
                    btnClick()
                    changeStatePrompt(false);
                }}
                onCancel={(event)=>{
                    changeStatePrompt(false);
                }}
            >
                <p>当前分类：{findCatName(id,state.list)||'分类根目录'}</p>
                <Input onChange={(event:React.ChangeEvent)=>changeInputValue((event.target as HTMLInputElement).value)} placeholder='请输入分类名称'></Input>
            </Modal>
            <Menu id='list'>
                <Menu.ItemGroup title={<span>所有任务 ({calTask(state, false)}/{calTask(state, true)})</span>}></Menu.ItemGroup>
                <Menu.ItemGroup title='分类列表'></Menu.ItemGroup>
                <UlList />
            </Menu>
            <div className='listDiv'>
                <Menu>
                    <Menu.Item onClick={() => {
                        if(!state.selected){
                            message.error('请选择要删除的分类');
                        }else{
                            dispatch(removeCat(state.selected));
                            message.success('删除分类成功');
                        }
                    }} style={{ width: '199px', borderTop: '1px solid #f0f0f0',position:'relative',top:'4px'}}>删除分类</Menu.Item>
                    <Menu.Item onClick={() => changeStatePrompt(true)} style={{ width: '199px', borderTop: '1px solid #f0f0f0' }}>添加分类</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}
export default AllList;
/*
const mapStateToProps = (state) => {
    return {
        id: state.selected,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (name, id) => {
            dispatch(addCat(name, id));
        },
        onRemove: (obj) => {
            if (obj.nodeName === "DIV") {
                dispatch(thingSelected(null));
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllList);
*/