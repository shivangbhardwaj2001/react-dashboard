import React, { useContext, useState } from 'react';
import DataContext from './DataContext';
import List from './List';
const Table = () => {
    const { currentPage, idCheckedStatus, setIdCheckedStatus, firstIndex, lastIndex, initialUserData, userData, afterClickTableCheck, setAfterClickTableCkeck } = useContext(DataContext)

    const tableCheckBoxClick = (e) => {
        const isChecked = e.target.checked;
        // replaced initialUserData with userData 
        const newCheckedStatus = userData.slice(firstIndex, lastIndex).map(data => ({
            id: data.id,
            checked: isChecked
        }));
        setIdCheckedStatus(isChecked ? newCheckedStatus : []);
        setAfterClickTableCkeck(!afterClickTableCheck)
    };


    return (
        <div id='table'>
            <div id='table-heading'>
                <input type='checkbox' checked={afterClickTableCheck} onClick={tableCheckBoxClick} />
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Action</div>
            </div>
            <List />
        </div>
    )
}
export default Table;