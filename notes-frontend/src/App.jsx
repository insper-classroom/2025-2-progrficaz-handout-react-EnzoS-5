import axios from "axios";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/notes/")
      .then((res) => setNotes(res.data));
  }, []);

  console.log(notes);

  return (
    <>
      {notes.map((note) => (
        <Note key={`note__${note.id}`} title={note.title}>
          {note.content}
        </Note>
      ))}
    </>
  );
}

export default App;