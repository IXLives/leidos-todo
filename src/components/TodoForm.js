import { useState } from 'react';
import '../styles/TodoForm.css';

function TodoForm({addTodo}) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
    
        addTodo({
        title,
        priority
        });
    
        setTitle('');
        setPriority('Medium');
    };
    
    return (
        <form onSubmit={handleSubmit} className="todo-form">
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoForm;