import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Todo App</h1>
            <TodoList />
          </div>
        </div>
      </div>
    </main>
  );
}
