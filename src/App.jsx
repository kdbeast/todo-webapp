import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo.jsx";
import { db } from "./firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Load from "./Load.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      console.log("Current data: ", snapshot.docs);
      setTodos(
        snapshot.docs.map((doc) => ({ todo: doc.data().todo, id: doc.id, time: new Date(doc.data().timestamp?.toDate()).toLocaleTimeString() }))
      );
    });

    return unsubscribe;
  }, []);

  const addTodo = (e) => {
    e.preventDefault(); // prevents page refresh
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="container">
      <h1 className="title">React TODO App</h1>
      <div className="mini-container1">
        <input
          className="input"
          placeholder="Add todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="button"
          disabled={!input}
          type="submit"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div className="mini-container2">
        {todos.length === 0 && <Load />}
        <ul>
          {todos.map((todo) => (
            <Todo text={todo.todo} key={todo.id} id={todo.id} time={todo.time} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
