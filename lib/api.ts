const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function createTodo(title: string) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ title, completed: false }),
      headers: { "Content-type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    alert("Failed to create todo.");
  }
}

export async function deleteTodo(id: number) {
  try {
    return await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    alert("Failed to delete todo.");
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  try {
    return await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    alert("Failed to update todo.");
  }
}

export async function getTodos() {
  try {
    const res = await fetch(`${API_URL}?_limit=10`);
    const data = await res.json();
    return data;
  } catch (error) {
    alert("Failed to get todos.");
  }
}
