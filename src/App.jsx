import { useState,useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./Context/todocontext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
 
  const [todos, setTodos] = useState([]);

  
  let addTodo = (todo, id) =>
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);

  let updateTodo = (id, todo) => 
    setTodos((prev) =>
      prev.map((eachtodo) =>
        eachtodo.id === id ? { ...eachtodo, ...todo } : eachtodo
      )
    );

  let deleteTodo = (id) =>
    setTodos((prev) => prev.filter((prev) => prev.id !== id ? prev : null));


  let toggleComplete = (id) => setTodos((prev) => 
    prev.map((t) => t.id === id ? {...t, completed: !t.completed} : t)
  )

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0){
      setTodos(todos)
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
