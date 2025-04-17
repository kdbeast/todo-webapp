import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";
import "./Todo.css";

function Todo({ text, id, time }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?"))
    deleteDoc(doc(db, "todos", id));
  };

  function handleOpen() {
    setInput(text);
    setOpen(true);
  }

  const updateTodo = () => {
    updateDoc(doc(db, "todos", id), {
      todo: input,
    });
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="todo">
        <div className="container1">
          <h3>{text}</h3>
          <p>{time}</p>
        </div>
        <div className="container2">
          <button className="edit" onClick={handleOpen} >Edit</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default Todo;
