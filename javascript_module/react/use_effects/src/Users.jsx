import React, { useEffect, useState } from 'react'
import { Card } from "antd";
import UserDetails from './UserDetails';

const Users = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUsers = async() => {
            try {
                const response = await fetch("https://dummyjson.com/users");
                const data = await response.json();
                console.log(data.users);
                setData(data.users);
            }
            catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, []);

    return (
        <div>
            {
                data.map((user) => {
                    let name = `${ user.firstName } ${ user.lastName }`;
                    return (<Card key={user.id} title={ name } style={{ marginTop: '10px' }}>
                                <p>
                                    <strong>Địa chỉ:</strong> { user.address.address + ", " + user.address.city + ", " + user.address.state } 
                                </p>
                                <p>
                                    <strong>Tuổi:</strong> { user.age } 
                                </p>
                                <p>
                                    <strong>Ngày sinh:</strong> { user.birthDate } 
                                </p>
                                <p>
                                    <button type="button" onClick={ () => setUserId(user.id) }>Xem chi tiết</button>
                                </p>
                            </Card>)
                })
            }
            { userId && <UserDetails userId = { userId }/> }
        </div>
    )
}

export default Users;