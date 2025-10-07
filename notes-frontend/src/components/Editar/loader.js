import axios from "axios";

export async function loader({ params }) {
    const note = await axios
                        .get(`http://localhost:8000/api/notes/${params.noteId}/`)
                        .then((response) => response.data)
    return { note };
}
