import { createContext, useContext, } from "react";

// Create Todo Context
const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "exercise", 
            completed: true
        }
    ],
    addTodo: (todo)=>{},
    updateTodo: (id, todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{},
});

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider


