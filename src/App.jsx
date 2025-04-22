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
          isComplete: doc.data()?.isComplete || false,
          time: doc.data().timestamp
            ? new Date(doc.data().timestamp.toDate()).toLocaleTimeString()
            : "No time",
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

  const incompleteTodos = todos.filter((todo) => !todo.isComplete);
  const completedTodos = todos.filter((todo) => todo.isComplete);

  return (
    <>
      <div className="container">
        <h1 className="title">React TODO App</h1>
        <div className="mini-container1">
          <input
            className="input"
            placeholder="Add todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {loading ? (
            <Load />
          ) : (
            <button
              className="button"
              disabled={!input}
              type="submit"
              onClick={addTodo}
            >
              {" "}
              Add{" "}
            </button>
          )}
        </div>
        <div className="mini-container2">
          {todos.length === 0 && <Load />}

          {todos.length !== 0 && (
            <div className="incomplete-todos-container mini-container2">
              <h2>Tasks</h2>
              {incompleteTodos.length === 0 && (
                <h4 className="empty-list-message">No tasks here!</h4>
              )}
              <ul>
                {incompleteTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    text={todo.todo}
                    id={todo.id}
                    time={todo.time}
                    isComplete={todo.isComplete}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {completedTodos.length > 0 && (
          <div className="completed-todos-container mini-container2">
            <h2>Completed</h2>
            <ul>
              {completedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  text={todo.todo}
                  id={todo.id}
                  time={todo.time}
                  isComplete={todo.isComplete}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
