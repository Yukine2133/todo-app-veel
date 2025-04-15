import { ITodo } from "@/interfaces/todo.interface";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/lib/api";
import { useEffect, useState } from "react";

export function useTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Add todo
  const handleAddTodo = async () => {
    const tempId = Date.now();

    const optimisticTodo: ITodo = {
      userId: 1,
      id: tempId,
      title: newTodo,
      completed: false,
    };

    setTodos((prev) => [...prev, optimisticTodo]);
    setNewTodo("");

    try {
      const res = await createTodo(newTodo);
      setTodos((prev) => prev.map((todo) => (todo.id === tempId ? res : todo)));
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

  // Update todo
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

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        alert("Failed to fetch todos.");
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
  };
}
