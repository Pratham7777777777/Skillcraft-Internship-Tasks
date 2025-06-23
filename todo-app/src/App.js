import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Delete Todo
  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);
    setTodos(todos.filter((e) => e !== todo));
    console.log("Deleted", todos);
  };

  // ✅ Add Todo
const addTodo = (title, desc, dateTime) => {
  console.log("I am adding this todo", title, desc, dateTime);
  let sno;
  if (todos.length === 0) {
    sno = 0;
  } else {
    sno = todos[todos.length - 1].sno + 1;
  }
  const myTodo = {
    sno: sno,
    title: title,
    desc: desc,
    dateTime: dateTime, // ✅ Correct usage now
    completed: false
  };
  setTodos([...todos, myTodo]);
  console.log(myTodo);
};


  // ✅ Toggle Completed Status
  const toggleComplete = (todo) => {
    const updatedTodos = todos.map((t) =>
      t.sno === todo.sno ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
  };

  // ✅ Edit Todo Function
  const editTodo = (sno, newTitle, newDesc) => {
    const updatedTodos = todos.map((todo) =>
      todo.sno === sno ? { ...todo, title: newTitle, desc: newDesc } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos
                todos={todos}
                onDelete={onDelete}
                onToggleComplete={toggleComplete}
                onEdit={editTodo} // ✅ Passed here
              />
            </>
          } />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
