import { render, screen } from '@testing-library/react';
import TodoStats from './TodoStats';

describe('TodoStats', () => {
  it('displays correct statistics', () => {
    const todos = [
      { completed: true },
      { completed: true },
      { completed: false },
      { completed: false },
    ];
    
    render(<TodoStats todos={todos} />);
    
    expect(screen.getByText('Total Todos: 4')).toBeInTheDocument();
    expect(screen.getByText('Completed Todos: 2')).toBeInTheDocument();
    expect(screen.getByText('Pending Todos: 2')).toBeInTheDocument();
  });

  it('handles empty state', () => {
    render(<TodoStats todos={[]} />);
    
    expect(screen.getByText('Total Todos: 0')).toBeInTheDocument();
    expect(screen.getByText('Completed Todos: 0')).toBeInTheDocument();
    expect(screen.getByText('Pending Todos: 0')).toBeInTheDocument();
  });
});