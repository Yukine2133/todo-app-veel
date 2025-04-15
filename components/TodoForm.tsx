import { ITodoFormProps } from "@/interfaces/todo.interface";
import React from "react";

export const TodoForm = ({
  newTodo,
  setNewTodo,
  handleAddTodo,
}: ITodoFormProps) => {
  return (
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
  );
};
