import React from 'react';
import UlList from './ulList';
import { connect } from 'react-redux';
import { addCat, thingSelected } from '../actions';
import './style.css';
const AllList = ({ onAdd, id, onRemove }) => {
    function btnClick() {
        var prom = prompt(`请输入要添加的分类名称`);
        if (prom) {
            console.log(id)
            onAdd(prom, id);
        }
    }
    return (
        <div id='task' onClick={(event)=>onRemove(event.target)}>
            <p>所有任务<span></span></p>
            <p>分类列表</p>
            <UlList />
            <div className='foot' onClick={btnClick}>添加分类</div>
        </div>
    )

}
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
            if(obj.nodeName==="DIV"){
                dispatch(thingSelected(null));
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllList)