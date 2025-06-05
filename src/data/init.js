export const initialTodos = [
  {
    id: 1,
    title: "Learn React Hooks",
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Complete practice project",
    completed: true,
    priority: "Medium",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];