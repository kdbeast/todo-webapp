import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import "./App.css";

function Todo({ text }) {
  return (
    <List className="todo_list">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={text} secondary="Dummy Deadline" />
      </ListItem>
    </List>
  );
}

export default Todo;
