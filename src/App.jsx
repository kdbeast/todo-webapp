import { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Todo from "./Todo.jsx";
import { db } from "./firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // this code here... fires when the app.js loads
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      console.log("Current data: ", snapshot.docs);
      setTodos(
        snapshot.docs.map((doc) => ({ todo: doc.data().todo, id: doc.id }))
      );
    });

    return unsubscribe;
  }, []);

  // console.log(input);

  const addTodo = (e) => {
    e.preventDefault(); // prevents page refresh

    
    // console.log("I am working");
    // setTodos([...todos, input]);
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput(""); // clears input field after clicking add todo button
    // console.log(todos);
  };

  return (
    <div>
      <h1>My first React TODO App</h1>
      <FormControl>
        <InputLabel htmlFor="my-input">Write Todo</InputLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </FormControl>
      <Button
        disabled={!input}
        type="submit"
        onClick={addTodo}
        variant="contained"
        color="primary"
      >
        Add Todo
      </Button>
      <ul>
        {todos.map((todo) => (
          <Todo text={todo.todo} id={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
