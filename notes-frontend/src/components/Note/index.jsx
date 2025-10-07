import axios from "axios";
import "./index.css";

export default function Note(props) {
  const deletarNote = () => {
    axios
      .delete(`http://localhost:8000/api/notes/${props.id}/`)
      .then(() => props.loadNotes())
      .catch((error) => console.log(error));
  };

  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>
      <div className="card-content">{props.children}</div>
      <button className="btn btn-delete" onClick={deletarNote}>
        Deletar
      </button>
    </div>
  );
}
