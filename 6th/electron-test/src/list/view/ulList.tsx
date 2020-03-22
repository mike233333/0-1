import React, { useContext } from 'react';
import { removeCat, thingSelected } from '../actions';
import { Menu, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { totalContext } from '../../Store';
import { SingleStateList } from '../../interface';

const UlList = () => {
    const { state, dispatch } = useContext(totalContext);
    const todos = state.list;
    //根据id（分类添加时间）进行排序 新添加的向下排列
    todos.sort((a:SingleStateList, b:SingleStateList) => {
        return a.id - b.id;
    });
    const renderTree = (data:[SingleStateList]) => {
        return data.map(item => {
            if (item.list.length === 0) {
                return (<Menu.Item className='listClass' id={`${item.id}`} key={item.id} onClick={() => dispatch(thingSelected(item.id))}>
                    {item.catName}
                </Menu.Item>)
            } else {
                return (<SubMenu className='listClass' data-id={`${item.id}`} key={item.id} title={(<span>{item.catName}</span>)} onTitleClick={() => dispatch(thingSelected(item.id))}>
                    {renderTree(item.list)}
                </SubMenu >)
            }
        })
    }
    return (
        <div className='ul1'>
            <Menu mode='inline'>
                {renderTree(todos)}
            </Menu>
        </div>
    )
}
export default UlList;
/*
ulList.propTypes = {
    todos: PropTypes.array.isRequired
}
const mapStateToProps = (state) => {
    return {
        todos: state.list,
        selected: state.selected
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onRemove: (id) => {
            dispatch(removeCat(id));
            //移除分类后focus到默认分类
            dispatch(thingSelected(null));
        },
        onSelected: (id) => {
            dispatch(thingSelected(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ulList);
*/