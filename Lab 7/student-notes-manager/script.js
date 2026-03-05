const API_URL = "http://localhost:3000/notes";

// Load Notes on Page Load
window.onload = fetchNotes;


// =============================
// ADD NOTE
// =============================
function addNote() {
    const title = document.getElementById("title").value;
    const subject = document.getElementById("subject").value;
    const description = document.getElementById("description").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, description })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        fetchNotes();
    });
}


// =============================
// VIEW NOTES
// =============================
function fetchNotes() {
    fetch(API_URL)
    .then(res => res.json())
    .then(notes => {
        const container = document.getElementById("notesContainer");
        container.innerHTML = "";

        notes.forEach(note => {
            container.innerHTML += `
                <div>
                    <h3>${note.title}</h3>
                    <p><b>Subject:</b> ${note.subject}</p>
                    <p>${note.description}</p>
                    <button onclick="deleteNote('${note._id}')">Delete</button>
                    <button onclick="updateNote('${note._id}')">Edit</button>
                    <hr>
                </div>
            `;
        });
    });
}


// =============================
// DELETE NOTE
// =============================
function deleteNote(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        fetchNotes();
    });
}


// =============================
// UPDATE NOTE
// =============================
function updateNote(id) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newTitle,
            description: newDescription
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        fetchNotes();
    });
}