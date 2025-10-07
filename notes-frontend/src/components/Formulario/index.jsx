import axios from "axios";
import { useState } from "react";
import "./index.css";

export default function Formulario(props) {
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");

  const criarNote = (event) => {
    event.preventDefault();

    console.log("Criando nota com dados:", { title: titulo, content: content });

    const data = {
      "title": titulo,
      "content": content
    }

    axios
      .post("http://localhost:8000/api/notes/", data)
      .then((response) => {
        console.log("Nota criada com sucesso:", response.data);
        props.loadNotes();
        setTitulo("");
        setContent("");
      })
      .catch((error) => {
        console.error("Erro ao criar nota:", error);
        console.error("Detalhes do erro:", error.response?.data);
      });
  }

  return (
    <form className="form-card" onSubmit={criarNote}>
      <input
        className="form-card-title"
        type="text"
        name="titulo"
        placeholder="Título"
        onChange={(event) => setTitulo(event.target.value)}
        value={titulo}
      />
      <textarea
        className="autoresize"
        name="detalhes"
        placeholder="Digite o conteúdo..."
        onChange={(event) => setContent(event.target.value)}
        value={content}
      ></textarea>
      <button className="btn" type="submit">Criar</button>
    </form>
  );
}
