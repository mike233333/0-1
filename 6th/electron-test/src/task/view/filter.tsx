import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { filterSelected } from '../actions';
import { FilterTypes } from '../../constants';
import { Radio } from 'antd';
import { totalContext } from '../../Store';

const Filter = ({}) => {
    const { dispatch } = useContext(totalContext);
    const onClicked=(text:string)=>{
        dispatch(filterSelected(text));
    }
    return (
        <div id='list1'>
            <Radio.Group size='middle' buttonStyle='solid' defaultValue='a'>
                <Radio.Button value='a' onClick={() => onClicked(FilterTypes.ALL)}>{FilterTypes.ALL}</Radio.Button>
                <Radio.Button value='b' onClick={() => onClicked(FilterTypes.UNCOMPLETED)}>{FilterTypes.UNCOMPLETED}</Radio.Button>
                <Radio.Button value='c' onClick={() => onClicked(FilterTypes.COMPLETED)}>{FilterTypes.COMPLETED}</Radio.Button>
            </Radio.Group>
        </div>
    )
}

export default Filter;
/*
const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter.name
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (text) => {
            dispatch(filterSelected(text));
        }
    }
}
Filter.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
*/
