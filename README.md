# Todo App

This is a simple Todo app built with **Next.js**, **React**, and **Tailwind CSS**. It allows users to add, delete, and toggle tasks using an API (mocked by JSONPlaceholder).

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 14 or later)
- **npm** or **yarn**

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Yukine2133/todo-app-veel.git
   ```

2. Navigate into the project directory:

   ```bash
   cd todo-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   Or if you are using **yarn**:

   ```bash
   yarn install
   ```

4. Run the project in development mode:

   ```bash
   npm run dev
   ```

   Or if you are using **yarn**:

   ```bash
   yarn dev
   ```

5. Open the application in your browser:
   - Visit [http://localhost:3000](http://localhost:3000)

### Project Structure

- `components/`: Contains the UI components, including the Todo list.
- `hooks/`: Contains the `useTodoList` hook which manages the application state and communicates with the API.
- `lib/`: Contains the API functions (`createTodo`, `deleteTodo`, `getTodos`, `toggleTodo`).

### Features

- **Add Todo**: Add a new todo with the input field.
- **Delete Todo**: Remove a todo from the list.
- **Toggle Completion**: Mark todos as completed or incomplete.
- **API Communication**: Communicates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) API to simulate CRUD operations.
