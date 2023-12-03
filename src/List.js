import React, { useContext, useState } from 'react';
import DataContext from './DataContext';
import ListItem from './ListItem';
const List = () => {
    const { firstIndex, lastIndex, records, userData, idCheckedStatus, setIdCheckedStatus } = useContext(DataContext)
    // this is a call back function , we need to know id of the checked listItem,so we pass this function
    // as a prop into the ListItem and if the checkbox is clicked then else stmt will render
    //it may happen that user first select and deselect the checkbox so for it the isChecked=false and 
    // we will run if stmt where we filter it out.
    // const handleCheckboxChange = (userId, isChecked) => {
    //     if (!isChecked) {
    //         setIdCheckedStatus(idCheckedStatus.filter(item => item.id !== userId))
    //     }
    //     else {
    //         setIdCheckedStatus([...idCheckedStatus, { id: userId, checked: isChecked }])
    //     }
    //     console.log(idCheckedStatus)
    // }
    const handleCheckboxChange = (userId, isChecked) => {
        setIdCheckedStatus(prevState => {
            const newState = prevState.filter(item => item.id !== userId);
            if (isChecked) {
                newState.push({ id: userId, checked: true });
            }
            return newState;
        });
    };

    return (
        <div className='list'>
            {
                userData.slice(firstIndex, lastIndex).map(user => (
                    <ListItem key={user.id} userId={user.id} userName={user.name} checked={idCheckedStatus.some(item => item.id === user.id && item.checked)}
                        userEmail={user.email} userRole={user.role} onCheckBoxChange={handleCheckboxChange} />
                ))

            }

        </div>
    )

}
export default List;