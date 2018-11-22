d3.csv("./books.csv", function(d) {
    return {
        priority: d.Priority,
        title: d.Title,
        author: d.Author,
        year: d["Year Published"],
        amazonUrl: d["Amazon Link"]
    };
},
function(error, dataset) {
    createTable(dataset);
});

function createTable(data) {
    const booksTable = document.getElementById("booksTableBody");

    data.forEach(function(book) {
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        col1.innerText = book.title;

        const col2 = document.createElement("td");
        col2.innerText = book.author;

        const col3 = document.createElement("td");
        col3.innerText = book.year;

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);

        booksTable.appendChild(row);
    });
}
