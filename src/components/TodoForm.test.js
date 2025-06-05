import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
    render(<TodoForm addTodo={mockAddTodo} />);
  });

  it('renders form with all required elements', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('has correct default priority selected', () => {
    const prioritySelect = screen.getByRole('combobox');
    expect(prioritySelect).toHaveValue('Medium');
  });

  it('updates title input when user types', () => {
    const titleInput = screen.getByRole('textbox');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput).toHaveValue('New Task');
  });

  it('updates priority when user selects different option', () => {
    const prioritySelect = screen.getByRole('combobox');
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    expect(prioritySelect).toHaveValue('High');
  });

  it('calls addTodo with correct data when form is submitted', () => {
    const titleInput = screen.getByRole('textbox');
    const prioritySelect = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(prioritySelect, { target: { value: 'Low' } });
    fireEvent.click(submitButton);

    // Verify mock function was called with correct data
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith({
      title: 'Test Task',
      priority: 'Low'
    });
  });

  it('does not call addTodo when title is empty', () => {
    const submitButton = screen.getByRole('button', { name: /add todo/i });
    fireEvent.click(submitButton);
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('resets form after successful submission', () => {
    const titleInput = screen.getByRole('textbox');
    const prioritySelect = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    // Simulate user input and submission
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    fireEvent.click(submitButton);

    // Verify form is reset
    expect(titleInput).toHaveValue('');
    expect(prioritySelect).toHaveValue('Medium');
  });

  it('requires title input', () => {
    const titleInput = screen.getByRole('textbox');
    expect(titleInput).toBeRequired();
  });
});