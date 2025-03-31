import { Flex } from 'antd';
import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        const getUsers = async() => {
            try {
                const response = await fetch("https://dummyjson.com/users");
                const data = await response.json();
                setUserList(data.users);
            }
            catch (error) {
                console.log(error);
            }
        }

        getUsers();
    }, []);

    if (!userList) {
        return <div>Loading...</div>
    }

    console.log(userList);

    return (
        <React.Fragment>
            <Flex justify='center' vertical style={{ marginTop: '20px' }}>
                {userList.map((user, idx) => {
                    return (
                    <Flex key={ idx }>
                        <p>
                            <strong>
                                Username: 
                            </strong>
                            { user.username }
                        </p>
                        <p style={{ marginLeft: '20px' }}>
                            <strong>
                                Password:
                            </strong>
                            { user.password }
                        </p>
                    </Flex>
                    )
                })}

            </Flex>
        </React.Fragment>
    )
}

export default UserList