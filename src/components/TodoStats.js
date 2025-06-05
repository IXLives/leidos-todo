import '../styles/TodoStats.css';

function TodoStats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="todo-stats">
      <h2>Todo Statistics</h2>
      <p>Total Todos: {totalTodos}</p>
      <p>Completed Todos: {completedTodos}</p>
      <p>Pending Todos: {pendingTodos}</p>
    </div>
  );
}

export default TodoStats;