import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { initialTodos } from './data/init';

// Helper function to load todos from localStorage
const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : null;
  } catch (error) {
    console.error('Failed to parse saved todos', error);
    return null;
  }
};

// Helper function to save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

function App() {
  // Initialize state with either saved todos or initialTodos
  const [todos, setTodos] = useState(() => {
    const savedTodos = loadTodos();
    return savedTodos || initialTodos;
  });

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Add todo handler
  const addTodo = (todo) => {
    setTodos([...todos, {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    }]);
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Get filtered and sorted todos
  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return priorityValues[b.priority] - priorityValues[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  };

  // Clear all todos and reset to initial
  const resetTodos = () => {
    if (window.confirm('Are you sure you want to reset all todos?')) {
      setTodos(initialTodos);
    }
  };

  return (
    <div className="App">
      <h1>Leidos Todo</h1>
      
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>

        <button onClick={resetTodos} className="reset-btn">
          Reset Todos
        </button>
      </div>
      
      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={getFilteredTodos()} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;