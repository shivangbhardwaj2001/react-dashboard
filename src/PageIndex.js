import React, { useContext, useEffect, useState } from 'react';
import DataContext from './DataContext';

const PageIndex = () => {
    const { currentPage, paginationNumbers, setCurrentPage, totalrows, setTotalRows, selectedRows, setSelectedRows, idCheckedStatus, initialUserData } = useContext(DataContext)
    const goToPage = (pageIndex) => {
        if (pageIndex < 1) {
            setCurrentPage(1)
        }
        else if (pageIndex > paginationNumbers.length) {
            setCurrentPage(paginationNumbers.length)
        }
        else {
            setCurrentPage(pageIndex)
        }
    }
    useEffect(() => {

        setSelectedRows(idCheckedStatus.length)
        setTotalRows(initialUserData.length)
    }, [idCheckedStatus, initialUserData])

    return (
        <div id='page-index' >
            <div>
                {selectedRows} of {totalrows} row(s) selected
            </div>
            <div id='pagination-index'>
                <div> Page {currentPage} of {paginationNumbers.length}</div>
                <div>
                    <button className='first-page' onClick={() => goToPage(1)}>First Page</button>
                    <button className='previous-page' onClick={() => goToPage(currentPage - 1)}>Previous Page</button>
                    {
                        paginationNumbers.map(index => (
                            <button onClick={() => goToPage(index)} key={index}>{index}</button>
                        ))
                    }
                    <button className='next-page' onClick={() => goToPage(currentPage + 1)}>Next Page</button>
                    <button className='last-page' onClick={() => goToPage(paginationNumbers.length)}>Last Page</button>
                </div>
            </div>
        </div>
    )
}
export default PageIndex