import React, { useContext, useReducer, useEffect } from "react";
import TodosContext from "./context";
import todosReducer from "./reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import useAPI from "./useAPI";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api.davidmateo.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos,
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};
export default App;
