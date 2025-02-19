import React, { useState } from "react";

function Todolist() {
    const [todolist, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingText(todolist[index]);
    };

    const saveEdit = (index) => {
        const updatedTodos = todolist.map((todo, idx) => idx === index ? editingText : todo);
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditingText('');
    };

    const handleEditChange = (e) => {
        setEditingText(e.target.value);
    };

    const removeTodo = (index) => {
        setTodos(todolist.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Todolist</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                setTodos([...todolist, newTodo]);
                setNewTodo('');
            }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new Todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todolist.map((todo, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => saveEdit(index)}>Save</button>
                                <button onClick={() => setEditingIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo}
                                <button onClick={() => startEditing(index)}>Edit</button>
                            </>
                        )}
                        <button onClick={() => removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;