import React, { useEffect, useState } from "react";

export const TodosListFetch = () => {
    const [todos, setTodos] = useState();
    const [inputValue, setInputValue] = useState("");
    const apiUrl = "https://playground.4geeks.com/todo"

    const getTodos = async () => {
        const response = await fetch(apiUrl + "/users/marianafs15");
        if (!response.ok) {
            if (response.status == 404) {
                createTodosList()
                console.log('no pudimos encontrar la lista, vamos a crear una lista nueva')
            } else {
                console.log('ocurrio un error al intentar encontrar la lista', response.status)
            }
            return
        }

        const data = await response.json()
        console.log(data)
        setTodos(data.todos)
        console.log('encontramos la lista, actualizando todos')

    }

    const createTodosList = async () => {
        const options = {
            method: 'POST'
        }
        const response = await fetch(apiUrl + "/users/marianafs15", options);
        if (response.status == 201) {
            getTodos()
            console.log('la lista fue creada con exito')
        } else {
            console.log('ocurrio un error al tratar de crear la lista', response.status)
        }
    }

    const newTask = async () => {
        const dataToSend = { label: inputValue, is_done: false };
        const uri = `${apiUrl}/todos/marianafs15`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return
        }
        const data = await response.json()
        console.log(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        newTask()
        getTodos()
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (

        <div className="container text-start">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="inputTask" className="form-label">Add new task</label>
                    <input type="text" className="form-control" id="inputTask" aria-describedby="emailHelp"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h2> Todos </h2>
            <ul className="list-group">
                {!todos ? 'loading...' :
                    todos.map(todo => {
                        return (

                            <li className="list-group-item" key={todo.id}>
                                {todo.label}
                            </li>
                        )
                    })
                }

                <li className="list-group-item text-end"> {!todos ? "no tienes tareas" : todos.length} </li>
            </ul>
        </div>
    )
}