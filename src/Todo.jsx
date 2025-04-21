import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";
import "./Todo.css";
import Load from "./Load";

function Todo({ text, id, time }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);

  const updateTodo = async () => {
    setOpen(true);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    updateDoc(doc(db, "todos", id), {
      todo: input,
    });

    setInput("");
    setLoading(false);

    setOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?"))
      deleteDoc(doc(db, "todos", id));
  };

  return (
    <>
      <div className="todo">
        <div className="container1">
          <h3>{text}</h3>
          <p>{time}</p>
        </div>
        <div className="container2">
          <button className="edit" onClick={handleOpen}>
            Edit
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {open === true && (
        <div className="edit-todo" open={open}>
          <h1>Update Todo</h1>
          <input
            placeholder={text}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {
            loading ? <Load /> : 
          <button className="update-btn" onClick={updateTodo}>
            Update Todo
          </button>
          }
          <button className="cancel-btn" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default Todo;
