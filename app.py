from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Lista temporária para armazenar as notas (em memória)
notes = [
    {
        "id": 1,
        "title": "Receita de miojo",
        "content": "Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque em uma vasilha e aproveite seu snack :)"
    },
    {
        "id": 2,
        "title": "Sorvete de banana",
        "content": "Coloque a banana no congelador e espere."
    }
]

next_id = 3

@app.route('/api/notes/', methods=['GET'])
def get_notes():
    print(f"GET /api/notes/ - Retornando {len(notes)} notas")
    return jsonify(notes)

@app.route('/api/notes/<int:note_id>/', methods=['GET'])
def get_note(note_id):
    print(f"GET /api/notes/{note_id}/")
    note = next((note for note in notes if note["id"] == note_id), None)
    if note:
        return jsonify(note)
    return jsonify({"error": "Nota não encontrada"}), 404

@app.route('/api/notes/', methods=['POST'])
def create_note():
    global next_id
    data = request.get_json()
    print(f"POST /api/notes/ - Dados recebidos: {data}")
    
    if not data:
        return jsonify({"error": "Dados não fornecidos"}), 400
    
    new_note = {
        "id": next_id,
        "title": data.get("title", ""),
        "content": data.get("content", "")
    }
    
    notes.append(new_note)
    next_id += 1
    
    print(f"Nova nota criada: {new_note}")
    return jsonify(new_note), 201

@app.route('/api/notes/<int:note_id>/', methods=['PUT'])
def update_note(note_id):
    data = request.get_json()
    print(f"PUT /api/notes/{note_id}/ - Dados recebidos: {data}")
    
    for note in notes:
        if note["id"] == note_id:
            note["title"] = data.get("title", note["title"])
            note["content"] = data.get("content", note["content"])
            print(f"Nota atualizada: {note}")
            return jsonify(note)
    
    return jsonify({"error": "Nota não encontrada"}), 404

@app.route('/api/notes/<int:note_id>/', methods=['DELETE'])
def delete_note(note_id):
    global notes
    print(f"DELETE /api/notes/{note_id}/")
    notes = [note for note in notes if note["id"] != note_id]
    return '', 204

if __name__ == '__main__':
    print("Iniciando servidor Flask na porta 8000...")
    print("Endpoints disponíveis:")
    print("  GET    /api/notes/")
    print("  GET    /api/notes/<id>/")
    print("  POST   /api/notes/")
    print("  PUT    /api/notes/<id>/")
    print("  DELETE /api/notes/<id>/")
    app.run(debug=True, port=8000, host='localhost')
