import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";
import TodosContext from "../context";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const {
    state: { todos, currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);
  const todoInputRef = useRef();

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
      todoInputRef.current.focus();
    } else {
      setTodo("");
    }
    // eslint-disable-next-line
  }, [currentTodo.text]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (todo.trim().length > 2) {
      if (
        todos.findIndex(t => {
          return t.text.trim() === todo.trim();
        }) > -1
      ) {
        setTodo("");
        return dispatch({ type: "DEFAULT_TODO", payload: todo });
      }
      if (currentTodo.text) {
        const response = await axios.patch(
          `https://hooks-api.davidmateo.now.sh/todos/${currentTodo.id}`,
          {
            text: todo.trim(),
          }
        );
        dispatch({ type: "UPDATE_TODO", payload: response.data });
      } else {
        const response = await axios.post(`https://hooks-api.davidmateo.now.sh/todos/`, {
          id: uuidv4(),
          text: todo.trim(),
          complete: false,
          edit: false,
        });
        dispatch({ type: "ADD_TODO", payload: response.data });
      }
    }

    setTodo("");
  };

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        name=""
        id=""
        required
        minLength="3"
        ref={todoInputRef}
        className="border-black border-solid border-2 pl-2"
        onKeyDown={event => {
          if (event.keyCode === 27) {
            setTodo("");
            dispatch({ type: "DEFAULT_TODO", payload: todo.trim() });
          }
        }}
        onChange={event => {
          return setTodo(event.target.value);
        }}
        value={todo}
      />
    </form>
  );
};

export default TodoForm;
