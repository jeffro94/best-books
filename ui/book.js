const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get("bookID");

if (bookID > 0) {
    fetch(`https://localhost:44344/api/books/${bookID}`)
        .then(response => response.json())
        .then(populateForm);
} else {
    document.getElementById("populateFromGR").style.display = "block";
}

document.getElementById("grSearch").addEventListener("click", grSearch);

document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();
    saveData();
});

function populateForm(data) {
    document.getElementById("inputTitle").value = data.title;
    if (data.author) document.getElementById("inputAuthor").value = data.author;
    if (data.yearPublished) document.getElementById("inputYearPublished").value = data.yearPublished;
    if (data.yearRevised) document.getElementById("inputYearRevised").value = data.yearRevised;
    if (data.whereHeardAbout) document.getElementById("inputWhere").value = data.whereHeardAbout;
    if (data.whenHeardAbout) document.getElementById("inputWhen").value = data.whenHeardAbout;
    if (data.notes) document.getElementById("inputNotes").value = data.notes;
    if (data.categories) document.getElementById("inputCategories").value = data.categories;
    if (data.wantToReadScore) document.getElementById("inputWantToReadScore").value = data.wantToReadScore;

    if (data.wikipediaURL) document.getElementById("inputWikipediaURL").value = data.wikipediaURL;
    if (data.goodReadsID) document.getElementById("inputGoodReadsID").value = data.goodReadsID;
    if (data.asin) document.getElementById("inputASIN").value = data.asin;

    document.getElementById("flagRead").checked = data.flagRead;
    document.getElementById("flagCurrentlyReading").checked = data.flagCurrentlyReading;
    document.getElementById("flagPartiallyRead").checked = data.flagPartiallyRead;
    document.getElementById("flagWantToRead").checked = data.flagWantToRead;

    document.getElementById("ownPrint").checked = data.ownPrint;
    document.getElementById("ownKindle").checked = data.ownKindle;
    document.getElementById("ownKindleSample").checked = data.ownKindleSample;
    document.getElementById("ownAudible").checked = data.ownAudible;
    document.getElementById("ownPDF").checked = data.ownPDF;
    document.getElementById("ownOtherAudio").checked = data.ownOtherAudio;

    if (data.dateCreated) document.getElementById("inputDateCreated").value = data.dateCreated;

    if (data.gR_Title) document.getElementById("hdnGR_Title").value = data.gR_Title;
    if (data.gR_Author) document.getElementById("hdnGR_Author").value = data.gR_Author;
    if (data.gR_Rating) document.getElementById("hdnGR_Rating").value = data.gR_Rating;
    if (data.gR_ReviewCount) document.getElementById("hdnGR_ReviewCount").value = data.gR_ReviewCount;
    if (data.gR_SyncDate) document.getElementById("hdnGR_SyncDate").value = data.gR_SyncDate;
    if (data.gR_Status) document.getElementById("hdnGR_Status").value = data.gR_Status;
    if (data.gR_StatusMessage) document.getElementById("hdnGR_StatusMessage").value = data.gR_StatusMessage;

    configureLinks(data);
}

function configureLinks(data) {
    const w = document.getElementById("linkToW");
    if (data.wikipediaURL) {
        w.href = data.wikipediaURL;
        w.style.display = "block";
    } else {
        w.style.display = "none";
    }

    const g = document.getElementById("linkToG");
    if (data.goodReadsID) {
        const url = `https://www.goodreads.com/book/show/${data.goodReadsID}`;
        g.href = url;
        g.style.display = "block";
    } else {
        g.style.display = "none";
    }

    const a = document.getElementById("linkToA");
    if (data.asin) {
        a.href = data.asin;
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

function saveData() {
    const data = {
        title: document.getElementById("inputTitle").value,
        author: document.getElementById("inputAuthor").value,
        yearPublished: document.getElementById("inputYearPublished").value,
        yearRevised: document.getElementById("inputYearRevised").value,
        whereHeardAbout: document.getElementById("inputWhere").value,
        whenHeardAbout: document.getElementById("inputWhen").value,
        wikipediaURL: document.getElementById("inputWikipediaURL").value,
        goodReadsID: document.getElementById("inputGoodReadsID").value,
        asin: document.getElementById("inputASIN").value,
        notes: document.getElementById("inputNotes").value,
        categories: document.getElementById("inputCategories").value,
        wantToReadScore: document.getElementById("inputWantToReadScore").value,

        flagRead: document.getElementById("flagRead").checked,
        flagCurrentlyReading: document.getElementById("flagCurrentlyReading").checked,
        flagPartiallyRead: document.getElementById("flagPartiallyRead").checked,
        flagWantToRead: document.getElementById("flagWantToRead").checked,

        ownPrint: document.getElementById("ownPrint").checked,
        ownKindle: document.getElementById("ownKindle").checked,
        ownKindleSample: document.getElementById("ownKindleSample").checked,
        ownAudible: document.getElementById("ownAudible").checked,
        ownPDF: document.getElementById("ownPDF").checked,
        ownOtherAudio: document.getElementById("ownOtherAudio").checked,

        dateCreated: document.getElementById("inputDateCreated").value,

        gR_Title: document.getElementById("hdnGR_Title").value,
        gR_Author: document.getElementById("hdnGR_Author").value,
        gR_Rating: document.getElementById("hdnGR_Rating").value,
        gR_ReviewCount: document.getElementById("hdnGR_ReviewCount").value,
        gR_SyncDate: document.getElementById("hdnGR_SyncDate").value,
        gR_Status: document.getElementById("hdnGR_Status").value,
        gR_StatusMessage: document.getElementById("hdnGR_StatusMessage").value

    };

    // consider switching to .fetch
    // https://stackoverflow.com/questions/1973140/parsing-json-from-xmlhttprequest-responsejson

    const xhr = new XMLHttpRequest();

    if (bookID > 0) {
        // this is an update
        data.bookId = bookID;

        xhr.open("PUT", `https://localhost:44344/api/books/${bookID}`, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 204) {
                // show the success message for one second
                const msg = document.getElementById("successMessage");

                msg.style.opacity = 1;
                setTimeout(function() {
                    msg.style.opacity = 0;
                }, 2000);

                configureLinks(data);
            }
        };
    } else {
        // this is a create
        xhr.open("POST", "https://localhost:44344/api/books", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.responseType = "json";

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
                const newBookID = xhr.response.bookId;
                window.location.href = `book.html?bookID=${newBookID}`;
            }
        };
    }

    xhr.send(JSON.stringify(data));
}

function grSearch() {

}