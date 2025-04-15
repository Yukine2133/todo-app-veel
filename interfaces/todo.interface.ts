export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoCardProps {
  todo: ITodo;
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

export interface ITodoFormProps {
  newTodo: string;
  setNewTodo: (e: string) => void;
  handleAddTodo: () => void;
}
