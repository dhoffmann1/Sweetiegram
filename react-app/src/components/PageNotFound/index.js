import React from 'react'
import "./PageNotFound.css"

const PageNotFound = () => {
    return (
        <>
            <div className='page-not-found-container'>
                <div className ='page-not-found-top-row-page'>
                    <i className="fa-brands fa-instagram"></i>
                    <h1 style={{marginLeft:"9px"}}>Page Not Found</h1>
                </div>
                <p> Make sure you have the right user id</p>
            </div>
        </>
    )
}

export default PageNotFound
