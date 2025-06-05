import '../styles/TodoList.css';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  const priorityColors = {
    Low: { 
      bg: 'hsl(195, 50%, 90%)',      // Very soft blue
      text: 'hsl(195, 30%, 30%)',    // Darker soft blue
      shadow: 'hsl(195, 30%, 70%)'   // Medium blue for shadows
    },
    Medium: { 
      bg: 'hsl(45, 60%, 90%)',       // Very soft yellow
      text: 'hsl(45, 30%, 30%)',     // Darker soft yellow
      shadow: 'hsl(45, 30%, 70%)'    // Medium yellow for shadows
    },
    High: { 
      bg: 'hsl(5, 50%, 90%)',        // Very soft red
      text: 'hsl(5, 30%, 30%)',      // Darker soft red
      shadow: 'hsl(5, 30%, 70%)'     // Medium red for shadows
    }
  };

  return (
    <ul>
      {todos.map((todo) => {
        const colors = priorityColors[todo.priority] || priorityColors.Medium;
        const formattedDate = new Date(todo.createdAt).toLocaleTimeString([], { 
          month: 'short',
          day: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
        });

        return (
          <li 
            key={todo.id}
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              boxShadow: `
                5px 5px 10px ${colors.shadow},
                -5px -5px 10px var(--light-shadow)
              `
            }}
          >
            <span
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <span className="priority-badge">{todo.priority}</span>
            <span>Created: {formattedDate}</span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;