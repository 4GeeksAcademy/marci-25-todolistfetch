import React, { useEffect, useState } from "react";


export const UserJPH = () => {

    const host = 'https://jsonplaceholder.typicode.com'
    const [users, setUsers] = useState()

    const getUsers = async () => {
        const uri = `${host}/users`;
        const options = {
            method: 'GET'
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);
        setUsers(data)
        return data
    }

    /*     const handleOnClick = () => {
            getUsers();
        } */

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="container">
            user jph
            {/*             <button onClick={handleOnClick} className={`btn btn-success`} type="button">
                Get Users
            </button> */}
            <div className="container">
                {!users ? 'No tengo Datos ' :
                    <ul className="list-group">
                        {users.map((item) => <li key={item.id} className="list-group-item">{item.name}</li>)}
                    </ul>
                }
            </div>

        </div>
    )
}