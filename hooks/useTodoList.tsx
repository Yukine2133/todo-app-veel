import { ITodo } from "@/interfaces/todo.interface";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/lib/api";
import { useEffect, useState } from "react";

export function useTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  // Generate a unique ID (avoiding backend's duplicate 201)
  const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 10000);

  // Add todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    const tempId = generateUniqueId();

    const optimisticTodo: ITodo = {
      userId: 1,
      id: tempId,
      title: newTodo.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, optimisticTodo]);
    setNewTodo("");

    try {
      const res = await createTodo(newTodo);

      // Override the duplicate ID from the API
      const savedTodo = {
        ...res,
        id: tempId,
        userId: 1,
      };

      setTodos((prev) =>
        prev.map((todo) => (todo.id === tempId ? savedTodo : todo))
      );
    } catch (error) {
      alert("Failed to add todo.");
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: number) => {
    const prevTodos = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      await deleteTodo(id);
    } catch (error) {
      alert("Failed to delete todo.");
      setTodos(prevTodos);
    }
  };

  // Toggle completed
  const handleToggleTodo = async (id: number) => {
    const prevTodos = todos;
    const toggled = todos.find((todo) => todo.id === id);
    if (!toggled) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      await toggleTodo(id, !toggled.completed);
    } catch (error) {
      alert("Failed to toggle todo.");
      setTodos(prevTodos);
    }
  };

  // Fetch initial todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(
          data.map((todo: ITodo) => ({ ...todo, id: generateUniqueId() }))
        );
      } catch (error) {
        alert("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return {
    todos,
    newTodo,
    setNewTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    loading,
  };
}
