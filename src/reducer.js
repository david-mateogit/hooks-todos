export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS": {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case "SET_CURRENT_TODO": {
      const allTodos = state.todos.map(t => {
        return t.id === action.payload.id
          ? { ...action.payload, edit: !t.edit }
          : { ...t, edit: false };
      });
      const isEditableTodo = action.payload.edit === false ? action.payload : {};
      return {
        ...state,
        todos: allTodos,
        currentTodo: isEditableTodo,
      };
    }
    case "TOGGLE_TODO": {
      const toggledTodos = state.todos.map(t => {
        return t.id === action.payload.id ? { ...action.payload } : t;
      });
      return {
        ...state,
        todos: toggledTodos,
      };
    }
    case "REMOVE_TODO": {
      const filteredTodos = state.todos.filter(t => {
        return t.id !== action.payload.id;
      });
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        todos: filteredTodos,
        currentTodo: isRemovedTodo,
      };
    }
    case "UPDATE_TODO": {
      const updatedTodo = {
        ...state.currentTodo,
        text: action.payload.text,
        edit: false,
        complete: false,
      };
      const updatedTodoIndex = state.todos.findIndex(t => {
        return t.id === state.currentTodo.id;
      });
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];

      return {
        ...state,
        todos: updatedTodos,
        currentTodo: {},
      };
    }
    case "DEFAULT_TODO": {
      const allTodos = state.todos.map(t => {
        return { ...t, edit: false };
      });
      const isEditableTodo = action.payload.edit === false ? action.payload : {};
      return {
        ...state,
        todos: allTodos,
        currentTodo: isEditableTodo,
      };
    }
    default:
      return state;
  }
}
