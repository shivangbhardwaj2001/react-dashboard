import React, { useContext, useEffect, useRef } from 'react';
import './App.css';
import DataContext, { DataProvider } from './DataContext';
import Table from './Table';
import PageIndex from './PageIndex';
function App() {
  const { userData, setUserData, loading, inputValue, setInputValue, idCheckedStatus, setIdCheckedStatus, initialUserData, setInitialUserData, filteredUserData, setFilteredUserData, afterClickTableCheck, setAfterClickTableCkeck, msg, setMsg } = useContext(DataContext)

  //defining ref for input and focus on input when enter is pressed
  const keyRef = useRef("");
  useEffect(() => {
    document.addEventListener('keypress', detectKeyDown, true)
  }, [])
  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      keyRef.current.focus();
    }
  }
  const deleteCheckedRecords = () => {
    // Create a Set of checked IDs for efficient lookup
    const checkedIds = new Set(idCheckedStatus.map(item => item.id));
    // const checkedIds = idCheckedStatus.map(item => item.id);
    // it will look like [1,2,4,6]
    // Filter out items whose ID is in the checkedIds Set
    const newUserData = initialUserData.filter(item => !checkedIds.has(item.id));
    // const newUserData = initialUserData.filter(item => !checkedIds.includes(item.id));
    //will remove data with id 1,2,4,6
    // Update the state with the filtered data
    setInitialUserData(newUserData);
    if (inputValue) {
      setFilteredUserData(newUserData)

    }
    // Clear the checked status state
    setIdCheckedStatus([]);
    setAfterClickTableCkeck(false)
    if (idCheckedStatus.length) {
      setMsg("Data deleted")
    }
  };
  useEffect(() => {
    if (msg != "") {
      setTimeout(() => setMsg(""), 3000)
    }
  }, [msg])
  const onInputChange = (e) => {
    setFilteredUserData(initialUserData.filter(data => {
      if (data.name.toLowerCase().includes(e.target.value.toLowerCase()) || data.email.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true;
      }

    }))
    setInputValue(e.target.value)
  }
  useEffect(() => {
    if (inputValue == "") {
      setMsg("")
    }
  }, [inputValue])
  return (
    loading ?
      <div className="App">
        <div className='top-icons'>
          <div>
            < input id='input-bar' placeholder="Enter Value...." value={inputValue} onChange={onInputChange} ref={keyRef} />
            <button id='clear-btn' onClick={() => setInputValue("")}>Clear</button>
          </div>
          <button className='delete-major icons8-trash-major' onClick={deleteCheckedRecords}></button>

        </div>
        <br />
        <div>{msg}</div>
        <Table />
        <PageIndex />

      </div > :
      <div id='loader'>App is Loading ....</div>
  );
}

export default App;
