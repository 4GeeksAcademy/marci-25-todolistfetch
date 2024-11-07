import React, { useEffect, useState } from "react";
import { Spinner } from '../component/Spinner.jsx';


export const TodoList = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({})
    const host = 'https://playground.4geeks.com/todo';
    const user = 'marci-25';

    const handleAddTodo = async (event) => {
        event.preventDefault();
        const dataToSend = {
            label: task,
            is_done: false
        }
        const uri = `${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        console.log(response);

        const data = await response.json()
        setList([...list, data])

    }

    const handleEditTodo = (event) => {
        event.preventDefault();
    }


    const getTodos = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'GET'
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error ', response.status, response.statusText);
            return
        }
        const data = await response.json()
        setList(data.todos)
        console.log('data:', data);
    }

    const createUser = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json()
    }

    const handleCreateUser = (event) => {
        event.preventDefault();
        createUser()
        getTodos()
    
      }
    


    const deleteTask = async (item) => {
        console.log(item);
        const uri = `${host}/todos/${item.id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        getTodos()
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="container">
            <h2 className="text-center text-success">Todo List With Fetch</h2>
            {!list ?
                <div className="container">
                    <p>No existe usuario</p>
                    <Spinner />
                    <form onSubmit={handleCreateUser}>
                        <label htmlFor="exampleUser" className="form-label">Crear Usario</label>
                        <input type="text" className="form-control" id="exampleUser"
                            value={user}
                            onChange={(event) => setUser(event.target.value)}
                        />
                    </form>
                </div>
                :
                <form onSubmit={handleAddTodo}>
                    <label htmlFor="exampleInput" className="form-label">Agregar Tareas</label>
                    <input type="text" className="form-control" id="exampleInput"
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                    />
                </form>
            }

            <h2 className="mt-3 text-success">
                Listado de Tareas <span className="text-danger">{user}</span>
            </h2>
            <ul className="list-group">
                {list.map((item, id) =>
                    <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
                        <div>
                            {item.is_done ?
                                <i className="text-success me-2 fas fa-thumbs-up"></i>
                                :
                                <i className="text-danger me-2 fas fa-ban"></i>}
                            {item.label}
                        </div>
                        <div>
                            <span onClick={() => deleteTask(item)}>
                                <i className="fas fa-trash text-danger"></i>
                            </span>
                        </div>
                    </li>
                )
                }
                <li className="list-group-item text-end bg-light fw-lighter">
                    {list.length === 0 ? 'Please, add a new task' : `${list.length} tasks`}
                </li>
            </ul>
        </div>
    )
}