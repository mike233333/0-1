import React from 'react';
import PropTypes from 'prop-types';
const ListItem = ({ className, onRemove, onSelected, catId, name }) => {
    //const checkedProp = completed ? { checked: true } : {};
    return (
        <h1>
            <input type='button' value='X' onClick={onRemove} />
            <p className={className} data-id={catId} onClick={onSelected}>{name}<span></span></p>
        </h1>
    )
}
ListItem.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired,
    catId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
export default ListItem;