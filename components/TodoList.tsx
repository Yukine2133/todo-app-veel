"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    const tempId = Date.now();

    const optimisticTodo: ITodo = {
      userId: 1,
      id: tempId,
      title: newTodo,
      completed: false,
    };

    // Optimistically update UI
    setTodos((prev) => [...prev, optimisticTodo]);
    setNewTodo("");

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify({
          title: newTodo,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const savedTodo = await res.json();

      // Replace temporary todo with actual one
      setTodos((prev) =>
        prev.map((todo) => (todo.id === tempId ? savedTodo : todo))
      );
    } catch (error) {
      alert("Failed to add todo.");
      // Rollback
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${API_URL}?_limit=10`);
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id: number) => {
    const prevTodos = todos;
    // Optimistic UI update
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      alert("Failed to delete todo.");
      // Rollback
      setTodos(prevTodos);
    }
  };

  const handleToggleTodo = async (id: number) => {
    const prevTodos = todos;
    const toggled = todos.find((todo) => todo.id === id);

    if (!toggled) return;

    // Optimistic UI update
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          completed: !toggled.completed,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      alert("Failed to toggle todo.");
      // Rollback
      setTodos(prevTodos);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-sm ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </label>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-gray-500 hover:text-red-500 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 pt-2">
        {todos.filter((todo) => !todo.completed).length} items left
      </div>
    </div>
  );
}
