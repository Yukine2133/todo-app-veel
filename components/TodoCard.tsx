import { ITodo, ITodoCardProps } from "@/interfaces/todo.interface";
import { Trash2 } from "lucide-react";

export const TodoCard = ({
  todo,
  handleToggleTodo,
  handleDeleteTodo,
}: ITodoCardProps) => {
  return (
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
            todo.completed ? "line-through text-gray-500" : "text-gray-900"
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
  );
};
