"use client";

import { useTodoList } from "@/hooks/useTodoList";
import { TodoCard } from "./TodoCard";
import { TodoForm } from "./TodoForm";

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
      <TodoForm
        handleAddTodo={handleAddTodo}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
      />

      <div className="space-y-2">
        {!loading &&
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              handleToggleTodo={handleToggleTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
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
