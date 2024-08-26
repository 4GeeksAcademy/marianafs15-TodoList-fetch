import React, { useEffect, useState } from "react";

export const TodosListFetch = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const apiUrl = "https://playground.4geeks.com/todo";

    const getTodos = async () => {
        const response = await fetch(apiUrl + "/users/marianafs15");
        if (!response.ok) {
            if (response.status === 404) {
                createTodosList();
                console.log("No pudimos encontrar la lista, vamos a crear una lista nueva.");
            } else {
                console.log("Ocurrió un error al intentar encontrar la lista", response.status);
            }
            return;
        }

        const data = await response.json();
        setTodos(data.todos);
        console.log("Encontramos la lista, actualizando todos");
    };

    const createTodosList = async () => {
        const options = {
            method: "POST",
        };
        const response = await fetch(apiUrl + "/users/marianafs15", options);
        if (response.status === 201) {
            getTodos();
            console.log("La lista fue creada con éxito");
        } else {
            console.log("Ocurrió un error al tratar de crear la lista", response.status);
        }
    };

    const newTask = async () => {
        const dataToSend = { label: inputValue, is_done: false };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        };
        const response = await fetch(apiUrl +'/todos/marianafs15', options);
        if (!response.ok) {
            console.log("Error: ", response.status, response.statusText);
            return;
        }
        getTodos();  
    };

    const updateTask = async (id) => {
        const dataToSend = { label: editingValue };
        const uri = `${apiUrl}/todos/${id}/marianafs15`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Error: ", response.status, response.statusText);
            return;
        }
        setEditingId(null); 
        setEditingValue(""); 
        getTodos();  
    };

    const deleteTask = async (id) => {
        const uri = `${apiUrl}/todos/${id}`;  
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Error: ", response.status, response.statusText);
            return;
        }
        getTodos();  
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue.trim() != "") {
            newTask();
            setInputValue(""); 
            
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="container text-start">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="inputTask" className="form-label">Add new task</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTask"
                        aria-describedby="taskHelp"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h2>Todos</h2>
            <ul className="list-group">
                {todos.length === 0 ? 'loading...' : todos.map(todo => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                        {editingId === todo.id ? (
                            <input
                                type="text"
                                className="form-control"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onBlur={() => updateTask(todo.id)}
                            />
                        ) : (
                            <span>{todo.label}</span>
                        )}
                        <div>
                            <i
                                className="fas fa-edit text-primary me-3"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setEditingId(todo.id);
                                    setEditingValue(todo.label);
                                }}
                            ></i>
                            <i
                                className="fas fa-trash-alt text-danger"
                                style={{ cursor: 'pointer' }}
                                onClick={() => deleteTask(todo.id)}
                            ></i>
                        </div>
                    </li>
                ))}
                <li className="list-group-item text-end">
                    {todos.length === 0 ? "No tienes tareas" : `${todos.length} tareas`}
                </li>
            </ul>
        </div>
    );
};
