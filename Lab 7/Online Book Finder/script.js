const API = "http://localhost:3000/books";

function displayBooks(books) {
    const container = document.getElementById("bookContainer");
    container.innerHTML = "";

    books.forEach(book => {
        container.innerHTML += `
            <div>
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <p>Price: ₹${book.price}</p>
                <p>Rating: ${book.rating}</p>
                <hr>
            </div>
        `;
    });
}

// 1️⃣ Search
function searchBook() {
    const title = document.getElementById("searchTitle").value;

    fetch(`${API}/search?title=${title}`)
        .then(res => res.json())
        .then(displayBooks);
}

// 2️⃣ Filter
function filterCategory() {
    const category = document.getElementById("category").value;

    fetch(`${API}/category/${category}`)
        .then(res => res.json())
        .then(displayBooks);
}

// 3️⃣ Sort
function sortBooks(field) {
    fetch(`${API}/sort/${field}`)
        .then(res => res.json())
        .then(displayBooks);
}

// 4️⃣ Top Rated
function topBooks() {
    fetch(`${API}/top`)
        .then(res => res.json())
        .then(displayBooks);
}

// 5️⃣ Pagination
function loadPage(page) {
    fetch(`${API}?page=${page}`)
        .then(res => res.json())
        .then(displayBooks);
}