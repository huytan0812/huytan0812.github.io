import React, { useState, useEffect } from 'react'

const UserDetails = (props) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async() => {
            try {
                const response = await fetch(`https://dummyjson.com/users/${ props.userId }`);
                const user = await response.json();
                setUser(user);
            }
            catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [props.userId])

    return (
        <div>UserDetails { props.userId }</div>
    )
}

export default UserDetails