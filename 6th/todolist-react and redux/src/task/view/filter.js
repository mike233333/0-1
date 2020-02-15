import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterSelected } from '../actions';
import { FilterTypes } from '../../constants';
const Filter = ({ filter, onClick }) => {
    return (
        <div id='list1'>
            <ul>
                <li className={filter===FilterTypes.ALL?'hover3':[]} onClick={()=>onClick(FilterTypes.ALL)}>{FilterTypes.ALL}</li>
                <li className={filter===FilterTypes.UNCOMPLETED?'hover3':[]} onClick={()=>onClick(FilterTypes.UNCOMPLETED)}>{FilterTypes.UNCOMPLETED}</li>
                <li className={filter===FilterTypes.COMPLETED?'hover3':[]} onClick={()=>onClick(FilterTypes.COMPLETED)}>{FilterTypes.COMPLETED}</li>
            </ul>
        </div>
    )
}
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
Filter.propTypes={
    onClick:PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);