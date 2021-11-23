import React, { useEffect, useState } from "react";
import { create } from "apisauce";

const TodoCharacterLimit = 140;

const baseAPIURL = "http://todoapp-backend-service.todoapp";
const api = create({
  baseURL: baseAPIURL,
  timeout: 5000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);

  const handleTodoSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    api
      .post("/todos", { text: todo })
      .then((response) => {
        console.log(response.data);
        const data = response.data as { id: string; text: string };
        if (data && "id" in data && "text" in data) {
          setTodos([...todos, data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .get("/todos")
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data)) {
          setTodos(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <img
        src="https://picsum.photos/1200"
        width="300"
        height="300"
        alt="Daily image"
        style={{ marginTop: "100px", marginLeft: "100px" }}
      />
      <form onSubmit={handleTodoSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="place your comment here..."
            value={todo}
            style={{ marginLeft: "100px" }}
            onChange={({ target }) => {
              if (target.value.length <= TodoCharacterLimit)
                setTodo(target.value);
            }}
          />
          <button type="submit" style={{ marginLeft: "5px" }}>
            Create TODO
          </button>
        </div>
      </form>
      <ul style={{ marginLeft: "100px" }}>
        {todos.length > 0 &&
          todos.map((todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
      </ul>
    </div>
  );
}

export default App;
