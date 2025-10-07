import axios from "axios";
import { useState } from "react";
import AppBar from "../AppBar";
import "./index.css";

export default function Editar({ note, onCancel, loadNotes }) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const salvarNota = (event) => {
        event.preventDefault();
        
        const data = {
            "title": title,
            "content": content
        }

        axios
            .put(`http://localhost:8000/api/notes/${note.id}/`, data)
            .then((response) => {
                console.log("Nota atualizada com sucesso:", response.data);
                loadNotes();
                onCancel(); // Volta para a página principal
            })
            .catch((error) => {
                console.error("Erro ao atualizar nota:", error);
            });
    }

    return (
        <>
        <AppBar />
        <main className="container">
            <form className="form-card" onSubmit={salvarNota}>
                <input
                    className="form-card-title"
                    type="text"
                    name="titulo"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea
                    className="autoresize"
                    name="detalhes"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                ></textarea>
                <button className="btn" type="submit">Salvar</button>
                <button className="btn btn-cancel" type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
        </main>
        </>
    );
}

