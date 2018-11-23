fetch("https://localhost:44344/api/books")
    .then(response => response.json())
    .then(createTable);

function createTable(data) {
    const booksTable = document.getElementById("booksTableBody");

    data.forEach(function(book) {
        const row = document.createElement("tr");

        row.attributes["data-bookId"] = book.bookId;

        const col1 = document.createElement("td");
        col1.innerText = book.title;

        const col2 = document.createElement("td");
        col2.innerText = book.author;

        const col3 = document.createElement("td");
        col3.innerText = book.yearPublished;

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);

        row.addEventListener("click", rowClicked);

        booksTable.appendChild(row);
    });
}

function rowClicked(e) {
    const bookId = e.currentTarget.attributes["data-bookId"];
    window.location.href = `book.html?bookID=${bookId}`;
}
