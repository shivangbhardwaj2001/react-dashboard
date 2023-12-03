import React, { useState, useRef, useEffect, useContext, createContext } from 'react';

const DataContext = createContext({});
export const DataProvider = ({ children }) => {

    //data fetched from API, deletion and updation will be done on this
    const [initialUserData, setInitialUserData] = useState([])

    //this data will be displayed on screen so filtered data is set to it and after updation/deletion of initialUserData
    // its  data will be set to it.
    const [userData, setUserData] = useState([])

    //loader
    const [loading, setLoading] = useState(false)

    // input value
    const [inputValue, setInputValue] = useState("")

    //filtered data which will be set to userData when input have any value
    const [filteredUserData, setFilteredUserData] = useState([])

    //defining states for pagination 
    const [currentPage, setCurrentPage] = useState("1")
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    //at start it will select 0,10  then 
    const records = userData.slice(firstIndex, lastIndex)
    //if recors are 48 and on every page we need 10 records then we are going to square off using ceil
    const numberOfPages = Math.ceil(userData.length / recordsPerPage)
    //...Array(5 + 1) will create 6 undefined value , .keys() will number from 0 to 6 
    //and at end slice will remove first element which is 0 so we have array [1,2,3,4,5]
    const paginationNumbers = [...Array(numberOfPages + 1).keys()].slice(1)

    // array of id and their checked status. will be used while cheking multiple listItems
    const [idCheckedStatus, setIdCheckedStatus] = useState([])

    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(res => res.json())
            .then(data => { setInitialUserData(data) })

        setLoading(true)
    }, [])

    //whenever initialUserData is changed , userData will be updated to it if input is empty
    useEffect(() => {
        if (inputValue == "") {
            setUserData(initialUserData)


        } else {
            setUserData(filteredUserData)
        }
    }, [initialUserData, inputValue])


    const [afterClickTableCheck, setAfterClickTableCkeck] = useState(false)
    const [msg, setMsg] = useState("");


    const [editEnabled, setEditEnabled] = useState(null);

    const [totalrows, setTotalRows] = useState(0);
    const [selectedRows, setSelectedRows] = useState(0);
    return (
        <DataContext.Provider value={{
            userData, setUserData,
            currentPage, setCurrentPage,
            paginationNumbers, numberOfPages, records,
            firstIndex, lastIndex,
            recordsPerPage,
            loading, setLoading,
            inputValue, setInputValue,
            filteredUserData, setFilteredUserData,
            initialUserData, setInitialUserData,
            idCheckedStatus, setIdCheckedStatus,
            afterClickTableCheck, setAfterClickTableCkeck,
            msg, setMsg,
            editEnabled, setEditEnabled,
            totalrows, setTotalRows,
            selectedRows, setSelectedRows



        }}>

            {children}

        </DataContext.Provider>
    )
}
export default DataContext;