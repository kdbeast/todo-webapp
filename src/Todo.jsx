import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Todo({ text, id }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleDelete = () => {
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1>Update Todo</h1>
            <input placeholder={text} value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={updateTodo}>Update Todo</Button>
          </div>
        </Box>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={text} secondary="Dummy Deadline" />
        </ListItem>
        <button onClick={handleOpen}>Edit</button>
        <DeleteForeverIcon
          onClick={handleDelete}
          variant="contained"
          color="primary"
        />
      </List>
    </>
  );
}

export default Todo;
