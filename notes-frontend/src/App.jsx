import axios from "axios";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import AppBar from "./components/AppBar";
import Formulario from "./components/Formulario";
import Editar from "./components/Editar";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const carregaNotas = () => {
    console.log("Carregando notas...");
    axios
      .get("http://localhost:8000/api/notes/")
      .then((res) => {
        console.log("Notas recebidas:", res.data);
        setNotes(res.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar notas:", error);
      });
  };

  const iniciarEdicao = (note) => {
    setEditingNote(note);
  };

  const cancelarEdicao = () => {
    setEditingNote(null);
  };

  useEffect(() => {
    carregaNotas();
  }, []);

  console.log("Estado atual das notas:", notes);

  // Se estiver editando uma nota, mostrar o componente de edição
  if (editingNote) {
    return <Editar note={editingNote} onCancel={cancelarEdicao} loadNotes={carregaNotas} />;
  }

  // Caso contrário, mostrar a página principal
  return (
    <>
      <AppBar />
      <main className="container">
        <Formulario loadNotes={carregaNotas} />
        <div className="card-container">
          {notes.map((note) => (
            <Note 
              key={`note__${note.id}`} 
              id={note.id} 
              title={note.title} 
              loadNotes={carregaNotas}
              onEdit={() => iniciarEdicao(note)}
            >
              {note.content}
            </Note>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;