import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import { initialTodos } from "./data/init";

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = JSON.stringify(value);
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("App Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  // Basic rendering test
  it("renders the app with initial todos", () => {
    render(<App />);
    expect(screen.getByText("Leidos Todo")).toBeInTheDocument();
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
    expect(screen.getByText("Complete practice project")).toBeInTheDocument();
  });

  // Test initial state loading
  it("loads todos from localStorage if available", () => {
    const testTodos = [
      {
        id: 3,
        title: "Test todo from localStorage",
        completed: false,
        priority: "Medium",
        createdAt: new Date().toISOString(),
      },
    ];
    window.localStorage.setItem("todos", testTodos);
    render(<App />);
    expect(screen.getByText("Test todo from localStorage")).toBeInTheDocument();
  });

  // Test adding a new todo
  it("adds a new todo when form is submitted", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Title");
    const addButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New Test Todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Test Todo")).toBeInTheDocument();
  });

  // Test toggling todo completion
  it("toggles todo completion status when clicked", () => {
    render(<App />);
    const todo = screen.getByText("Learn React Hooks");
    fireEvent.click(todo);

    expect(todo).toHaveStyle("text-decoration: line-through");
    expect(todo).toHaveStyle("opacity: 0.7");
  });

  // Test deleting a todo
  it("deletes a todo when delete button is clicked", () => {
    render(<App />);
    const todo = screen.getByText("Learn React Hooks");
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);
    expect(todo).not.toBeInTheDocument();
  });

  // Test filtering todos
  it("filters todos based on status filter", () => {
    render(<App />);
    const filterSelect = screen.getByDisplayValue("All");

    // Filter by active
    fireEvent.change(filterSelect, { target: { value: "active" } });
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
    expect(
      screen.queryByText("Complete practice project")
    ).not.toBeInTheDocument();

    // Filter by completed
    fireEvent.change(filterSelect, { target: { value: "completed" } });
    expect(screen.queryByText("Learn React Hooks")).not.toBeInTheDocument();
    expect(screen.getByText("Complete practice project")).toBeInTheDocument();
  });

  // Test priority filtering
  it("filters todos based on priority filter", () => {
    render(<App />);
    const prioritySelect = screen.getByDisplayValue("All Priorities");

    // Filter by High priority
    fireEvent.change(prioritySelect, { target: { value: "High" } });
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
    expect(
      screen.queryByText("Complete practice project")
    ).not.toBeInTheDocument();
  });

  // Test sorting todos
  it("sorts todos based on sort option", () => {
    render(<App />);
    const sortSelect = screen.getByDisplayValue("Sort by Date");

    // Sort by priority
    fireEvent.change(sortSelect, { target: { value: "priority" } });
    const todos = screen.getAllByRole("listitem");
    expect(todos[0]).toHaveTextContent("Learn React Hooks"); // High priority should come first
  });

  // Test reset todos
  it("resets todos to initial state when reset button is clicked", () => {
    // Add a test todo first
    render(<App />);
    const input = screen.getByPlaceholderText("Title");
    const addButton = screen.getByText("Add Todo");
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    // Now reset
    const resetButton = screen.getByText("Reset Todos");
    window.confirm = jest.fn(() => true); // Mock confirm to return true
    fireEvent.click(resetButton);

    expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
  });
});
