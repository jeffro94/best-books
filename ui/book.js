const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get("bookID");

fetch(`https://localhost:44344/api/books/${bookID}`)
    .then(response => response.json())
    .then(populateData);

// document.getElementById("saveButton").addEventListener("click", saveData); 

document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();
    saveData();
}); 

function populateData(data) {
    document.getElementById("inputTitle").value = data.title;
    if (data.author) document.getElementById("inputAuthor").value = data.author;
    if (data.yearPublished) document.getElementById("inputYearPublished").value = data.yearPublished;
    if (data.yearRevised) document.getElementById("inputYearRevised").value = data.yearRevised;
    if (data.whereHeardAbout) document.getElementById("inputWhere").value = data.whereHeardAbout;
    if (data.whenHeardAbout) document.getElementById("inputWhen").value = data.whenHeardAbout;
    if (data.notes) document.getElementById("inputNotes").value = data.notes;
    if (data.categories) document.getElementById("inputCategories").value = data.categories;

    if (data.wikipediaURL) { 
        const input = document.getElementById("inputWikipediaURL");
        const a = document.getElementById("linkToW");

        input.value = data.wikipediaURL;
        a.href = data.wikipediaURL;
        a.style.display = "block";
    }

    if (data.goodReadsID) { 
        const input = document.getElementById("inputGoodReadsID");
        const a = document.getElementById("linkToG");
        const url = `https://www.goodreads.com/book/show/${data.goodReadsID}`;

        input.value = url;
        a.href = url;
        a.style.display = "block";
    }

    if (data.asin) { 
        const input = document.getElementById("inputASIN");
        const a = document.getElementById("linkToA");
        input.value = data.asin;

        a.href = data.asin;
        a.style.display = "block";
    }

}

function saveData() {
    const formData = document.getElementById

    const data = {

    }

    fetch(`https://localhost:44344/api/books/${bookID}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(function(response) {
            
        });
}
