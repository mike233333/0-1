import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './listItem';
import { connect } from 'react-redux';
import { removeCat, thingSelected } from '../actions';

const ulList = ({ todos, selected, onSelect, onRemove }) => {
    //根据id（分类添加时间）进行排序 新添加的向下排列
    todos.sort((a, b) => {
        return a.id - b.id;
    })
    return (
        <ul className='ul1'>
            {
                todos.map(item => {
                    return (function getTree(item) {
                        var jsx =
                            <li key={item.id} >
                                <ListItem
                                    className={selected === item.id ? 'hover' : []}
                                    catId={item.id}
                                    name={item.catName}
                                    onRemove={() => onRemove(item.id)}
                                    onSelected={() => onSelect(item.id)} />
                                <ul className='ul2'>
                                    {
                                        item.list.length !== 0 ? item.list.sort((a, b) => {
                                            return a.id - b.id;
                                        }).map(item2 => {
                                            var jsx = getTree(item2)
                                            return jsx;
                                        }) : []
                                    }
                                </ul>
                            </li>;
                        return jsx;
                    })(item);
                })
            }
        </ul>
    )
}
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
        onSelect: (id) => {
            dispatch(thingSelected(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ulList)