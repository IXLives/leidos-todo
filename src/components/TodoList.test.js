import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'First Todo',
      priority: 'Low',
      completed: false,
      createdAt: '2023-01-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Second Todo',
      priority: 'High',
      completed: true,
      createdAt: '2023-01-02T11:00:00Z'
    },
    {
      id: 3,
      title: 'Third Todo',
      priority: 'Medium',
      completed: false,
      createdAt: '2023-01-03T12:00:00Z'
    }
  ];

  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    mockToggleTodo.mockClear();
    mockDeleteTodo.mockClear();
  });

  it('renders all todos when provided', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Third Todo')).toBeInTheDocument();
  });

  it('renders correct priority badges for each todo', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies correct styling for completed todos', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    const completedTodo = screen.getByText('Second Todo');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
    expect(completedTodo).toHaveStyle('opacity: 0.7');
  });

  it('calls toggleTodo when todo text is clicked', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    fireEvent.click(screen.getByText('First Todo'));
    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });

  it('applies correct priority colors', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    const todoItems = screen.getAllByRole('listitem');
    
    // Low priority
    expect(todoItems[0]).toHaveStyle('background-color: hsl(195, 50%, 90%)');
    expect(todoItems[0]).toHaveStyle('color: hsl(195, 30%, 30%)');
    
    // High priority
    expect(todoItems[1]).toHaveStyle('background-color: hsl(5, 50%, 90%)');
    expect(todoItems[1]).toHaveStyle('color: hsl(5, 30%, 30%)');
    
    // Medium priority
    expect(todoItems[2]).toHaveStyle('background-color: hsl(45, 60%, 90%)');
    expect(todoItems[2]).toHaveStyle('color: hsl(45, 30%, 30%)');
  });

  it('renders empty state when no todos provided', () => {
    render(
      <TodoList 
        todos={[]} 
        toggleTodo={mockToggleTodo} 
        deleteTodo={mockDeleteTodo} 
      />
    );
    
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});