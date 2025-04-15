"use client";

import { Trash2 } from "lucide-react";
import { useTodoList } from "@/hooks/useTodoList";

export default function TodoList() {
  const {
    todos,
    newTodo,
    setNewTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    loading,
  } = useTodoList();

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
          className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {!loading &&
          todos.map((todo) => (
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
                  className="h-4 w-4 cursor-pointer text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
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
                className="text-gray-500 hover:text-red-500 focus:outline-none cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

        {loading && (
          <p className="text-2xl text-black text-center">Loading...</p>
        )}
      </div>

      {!loading && (
        <div className="text-sm text-gray-500 pt-2">
          {todos.filter((todo) => !todo.completed).length} items left
        </div>
      )}
    </div>
  );
}
