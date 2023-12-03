import React, { useContext, useEffect, useState } from 'react';
import DataContext from './DataContext';

const ListItem = ({ userId, userName, userEmail, userRole, onCheckBoxChange, checked }) => {
    const { initialUserData, setInitialUserData, userData, setUserData, editEnabled, setEditEnabled, firstIndex, lastIndex, idCheckedStatus, setAfterClickTableCkeck } = useContext(DataContext)
    const isEditing = userId === editEnabled;
    const handleCheckBoxChange = (e) => {
        onCheckBoxChange(userId, e.target.checked);

    }
    const onListItemDelete = () => {
        setInitialUserData(initialUserData.filter(dx => dx.id != userId))
    }
    const onDoneClick = () => {
        const tempData = initialUserData;
        const objIndex = tempData.findIndex((obj => obj.id == userId));
        tempData[objIndex].name = nameChange;
        tempData[objIndex].email = emailChange;
        tempData[objIndex].role = roleChange;
        setInitialUserData(tempData);

        setEditEnabled(null);


    }

    const value1 = (userRole == 'admin' ? 'admin' : 'member')
    const value2 = (userRole == 'admin' ? 'member' : 'admin')
    const [nameChange, setNameChange] = useState(userName);
    const [emailChange, setEmailChange] = useState(userEmail);
    const [roleChange, setRoleChange] = useState(value1);
    //check box when all listitems are checked
    function arraysAreEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    }
    useEffect(() => {
        const tempIndexArr1 = []
        for (var i = firstIndex + 1; i <= lastIndex; i++) {
            tempIndexArr1.push(i)
        }
        // console.log(firstIndex + 1, lastIndex)
        const tempIndexArr2 = idCheckedStatus.map(data => Number(data.id))
        tempIndexArr2.sort((a, b) => a - b)
        tempIndexArr1.sort((a, b) => a - b)
        let isEqual = arraysAreEqual(tempIndexArr1, tempIndexArr2);
        if (isEqual) { setAfterClickTableCkeck(true) }
        // console.log(tempIndexArr1, tempIndexArr2)
    }, [idCheckedStatus])
    return (
        <div className='list-item'>
            {!isEditing ? <>
                <input onChange={handleCheckBoxChange} type='checkbox' checked={checked} />
                <div>{userName}</div>
                <div>{userEmail}</div>
                <div>{userRole}</div>
                <div className='list-item-button'>
                    <button className='icons8-edit' onClick={() => { setEditEnabled(userId) }}></button>
                    <button className='icons8-trash-small' onClick={onListItemDelete}> </button>
                </div>
            </> :
                <>
                    <div></div>
                    <input value={nameChange} onChange={(e) => setNameChange(e.target.value)} />
                    <input value={emailChange} onChange={(e) => setEmailChange(e.target.value)} />
                    <select name="role" className='user-role' value={roleChange} onChange={(e) => setRoleChange(e.target.value)}>
                        <option value={value1}>{value1}</option>
                        <option value={value2}>{value2}</option>
                    </select>
                    <div>
                        <button className="icons8-tick-box" onClick={onDoneClick}></button>
                    </div>
                </>
            }
        </div>
    )

}
export default ListItem;