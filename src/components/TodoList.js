import React, { useContext } from "react";
import axios from "axios";
import TodosContext from "../context";

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);

  const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";
  return (
    <div className="container mx-auto max-w-lg text-center font-mono">
      <h1 className="text-bold text-4xl">{title}</h1>
      <ul className="text-white items-center">
        {state.todos.map(todo => {
          return (
            <li
              key={todo.id}
              className="flex bg-orange-700 border-black border-dashed border-2 my-2 py-4"
            >
              <span
                onDoubleClick={async () => {
                  const response = await axios.patch(
                    `https://hooks-api.davidmateo.now.sh/todos/${todo.id}`,
                    {
                      ...todo,
                      complete: !todo.complete,
                    }
                  );
                  return dispatch({ type: "TOGGLE_TODO", payload: response.data });
                }}
                className={`flex-1 cursor-pointer ${todo.complete &&
                  "line-through text-gray-900"}`}
              >
                {todo.edit === true ? "..." : todo.text}
              </span>
              <button
                type="button"
                onClick={() => {
                  return dispatch({ type: "SET_CURRENT_TODO", payload: todo });
                }}
              >
                <img
                  src="https://icon.now.sh/edit/0050c5"
                  alt="Edit Icon"
                  className="h-6"
                />
              </button>
              <button
                type="button"
                onClick={async () => {
                  await axios.delete(
                    `https://hooks-api.davidmateo.now.sh/todos/${todo.id}`
                  );
                  return dispatch({ type: "REMOVE_TODO", payload: todo });
                }}
              >
                <img
                  src="https://icon.now.sh/delete/8b0000"
                  alt="Delete Icon"
                  className="h-6"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
