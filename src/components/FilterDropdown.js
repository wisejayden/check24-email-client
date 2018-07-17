import React from 'react';
const FilterDropdown = (props) => {
    return(
        <label>
            <select value={props.dropdownValue} onChange={props.dropdownHandleChange}>
                <option value="date">Date</option>
                <option value="sender">Sender</option>
                <option value="subject">Subject</option>
            </select>
        </label>
     )
}

export default FilterDropdown;
