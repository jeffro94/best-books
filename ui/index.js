fetch("https://localhost:44344/api/books/userId/1")
    .then(response => response.json())
    .then(createTable);

// Quick and easy implementation for column sorting
//   adapted from: https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2))(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll("th").forEach(th => th.addEventListener("click", (() => {
    Array.from(document.querySelectorAll("tbody > tr"))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => document.querySelector("tbody").appendChild(tr));
})));

// end sorting code

function createTable(data) {
    const booksTable = document.getElementById("booksTableBody");

    data.forEach(function(book) {
        const row = document.createElement("tr");

        row.attributes["data-bookId"] = book.bookId;

        const colCurrent = document.createElement("td");
        colCurrent.innerText = (book.flagCurrentlyReading ? "\u2713" : "");

        const colWant = document.createElement("td");
        colWant.innerText = (book.flagWantToRead ? "\u2713" : "");

        const colScore = document.createElement("td");
        colScore.innerText = book.wantToReadScore;

        const col1 = document.createElement("td");
        col1.innerText = book.title;
        col1.title = book.title;
        col1.classList.add("text-truncate");
        col1.style.maxWidth = "450px";

        const col2 = document.createElement("td");
        col2.innerText = book.author;
        col2.title = book.author;
        col2.classList.add("text-truncate");
        col2.style.maxWidth = "250px";

        const col3 = document.createElement("td");
        col3.innerText = book.yearPublished;

        const colRating = document.createElement("td");
        colRating.innerText = book.gR_Rating ? Number(book.gR_Rating).toFixed(2) : "";
        colRating.classList.add("text-right");

        const colRatingCount = document.createElement("td");
        // colRatingCount.innerText = book.gR_RatingCount ? Number(book.gR_RatingCount).toLocaleString() : "";
        colRatingCount.innerText = book.gR_RatingCount;
        colRatingCount.classList.add("text-right");

        row.appendChild(colCurrent);
        row.appendChild(colWant);
        row.appendChild(colScore);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(colRating);
        row.appendChild(colRatingCount);

        row.addEventListener("click", rowClicked);

        booksTable.appendChild(row);
    });
}

function rowClicked(e) {
    const bookId = e.currentTarget.attributes["data-bookId"];
    window.location.href = `book.html?bookID=${bookId}`;
}