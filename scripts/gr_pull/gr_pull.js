const fetch = require("node-fetch");
const util = require("util");

// this is only to allow node to work with the self-signed cert on localhost https
// it should be removed once the API is moved to cloud host
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let bookList = [];

fetch("https://localhost:44344/api/books")
    .then(response => response.json())
    .then(function(data) {
        bookList = data;
        doWork();
    })
    .catch(function(err) {
        console.log("Call to local books API failed", err);
    });

async function doWork() {
    for (let i = 0; i < bookList.length; i++) {  
        try {
            if (bookList[i].gR_Status != 'OK') {
                console.log("Processing " + bookList[i].title);
                getBookFromGRandUpdateDB(bookList[i]);
                await sleep(1200);
            }
        }
        catch(err) {
            console.log("Error in getBookFromGRandUpdateDB", err);
            return;
        }
    }

    // use this to update a single book
    // getBookFromGRandUpdateDB(bookList.filter(item => item.bookId == 73)[0]);

}

function getBookFromGRandUpdateDB(book) {
    let grID = book["goodReadsID"];
    let url = `http://localhost:3010/book/${grID}`;
    
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                console.log('GR API Call returned error: ' + response.status);
                return;
            }

            response.json().then(function(data) {
                updateDB(book, data);
            })
            .catch(function(err) {
                console.log('Error getting response text: ', err);
            });
        })
        .catch(function(err) {
            console.log('GR API Fetch failed: ', err);
        });
}

function updateDB(book, apiResponse) {
    // this will print the entire object to the console
    // console.log(util.inspect(apiResponse, false, null));

    // update the relevant GR fields
    book.gR_Title = apiResponse.gR_Title;
    book.gR_Author = apiResponse.gR_Author;
    book.gR_OriginalPublicationYear = apiResponse.gR_OriginalPublicationYear;
    book.gR_Rating = apiResponse.gR_Rating;
    book.gR_RatingCount = apiResponse.gR_RatingCount;
    book.gR_ReviewCount = apiResponse.gR_ReviewCount;
    book.gR_Status = apiResponse.gR_Status;
    book.gR_Status_Message = apiResponse.gR_Status_Message;
    book.gR_SyncDate = new Date().toISOString();

    // now update it in the DB
    fetch(`https://localhost:44344/api/books/${book.bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(book)
    })
    .then(function(response) {
        if (!response.ok) {
            console.log("Error on update: " + response.status);
        }
    })
    .catch(function(err) {
        console.log("Error on update: ", err);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
