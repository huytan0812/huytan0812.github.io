import React from 'react'

const Logout = () => {
    localStorage.removeItem('token');

    return (
        <div>logout</div>
    )
}

export default Logout