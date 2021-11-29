import React, { useEffect, useState } from "react";
import { create } from "apisauce";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Box,
  Button,
  Divider,
  InputUnstyled,
  styled,
  Typography,
} from "@mui/material";

const TodoCharacterLimit = 140;

const baseAPIURL = "http://localhost:8081";
const api = create({
  baseURL: baseAPIURL,
  timeout: 5000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

const StyledInputElement = styled("input")`
  width: 200px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 230px;
    transition: width 200ms ease-out;
  }
`;

interface ITodoProps {
  id: number;
  done: boolean;
  text: string;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<ITodoProps[]>([]);

  const handleTodoSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    api
      .post("/todos", { text: todo })
      .then((response) => {
        console.log(response.data);
        const data = response.data as ITodoProps;
        if (data && "done" in data && "text" in data) {
          setTodos([...todos, data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTodo("");
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
    <Box sx={{ marginTop: "100px", marginLeft: "100px" }}>
      <img
        src="https://picsum.photos/1200"
        width="300"
        height="300"
        alt="Daily image"
      />
      <Typography variant="h3" component="h3" style={{ fontWeight: 550 }}>
        Todos
      </Typography>
      <Divider sx={{ width: "300px" }} />
      <ul style={{ marginTop: "15px" }}>
        {todos.length > 0 &&
          todos.map((todoItem) => {
            return (
              <li
                key={todoItem.id}
                onClick={(event) => {
                  event.currentTarget.style.textDecoration = "line-through";
                  setTimeout(() => {
                    api
                      .delete(`/todos/${todoItem.id}`)
                      .then(() => {
                        setTodos(todos.filter((t) => t.id !== todoItem.id));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }, 1000);
                }}
              >
                {todoItem.text}
                {todoItem.done ? (
                  <CheckIcon
                    style={{
                      margin: 0,
                      padding: 0,
                      position: "relative",
                      bottom: "-5px",
                      color: "green",
                    }}
                  />
                ) : (
                  <ClearIcon
                    style={{
                      margin: 0,
                      padding: 0,
                      position: "relative",
                      bottom: "-5px",
                      color: "red",
                    }}
                  />
                )}
              </li>
            );
          })}
      </ul>
      <Divider sx={{ width: "300px" }} />
      <Typography variant="h5" component="h5" style={{ fontWeight: 550 }}>
        Create New Todo
      </Typography>
      <Divider sx={{ width: "300px" }} />
      <form onSubmit={handleTodoSubmit}>
        <div style={{ marginTop: "15px" }}>
          <InputUnstyled
            components={{ Input: StyledInputElement }}
            type="text"
            name="title"
            placeholder="Enter todo..."
            value={todo}
            onChange={({ target }) => {
              if (target.value.length <= TodoCharacterLimit)
                setTodo(target.value);
            }}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            style={{ marginTop: "5px" }}
          >
            Create TODO
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default App;
