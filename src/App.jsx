import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo.jsx";
import { db } from "./firebase";
import {onSnapshot, collection, addDoc, serverTimestamp} from "firebase/firestore";
import Load from "./Load.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const sortedDocs = [...snapshot.docs].sort((a, b) => {
        const timeA = a.data().timestamp?.toDate().getTime() || 0;
        const timeB = b.data().timestamp?.toDate().getTime() || 0;
        return timeB - timeA;
      });
      setTodos(
        sortedDocs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          time: new Date(doc.data().timestamp?.toDate()).toLocaleTimeString(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">React TODO App</h1>
        <div className="mini-container1">
          <input className="input" placeholder="Add todo" value={input} onChange={(e) => setInput(e.target.value)}/>
          {loading ? (
            <Load />
          ) : (
            <button className="button" disabled={!input} type="submit"onClick={addTodo}> Add </button>
          )}
        </div>
        <div className="mini-container2">
          {todos.length === 0 && <Load />}
          <ul>
            {todos.map((todo) => (
              <Todo text={todo.todo} key={todo.id} id={todo.id} time={todo.time}/>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;