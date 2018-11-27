const xml2js = require("xml2js");
const fetch = require("node-fetch");
const util = require("util");

const apiKey = "p7YoeD7BsZq3d69eaDpdA";

// this is only to allow node to work with the self-signed cert on localhost https
// it should be removed once the API is moved to cloud host
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let bookList = [];

let grID = 50;

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
            console.log("Processing " + bookList[i].title);
            getBookFromGRandUpdateDB(bookList[i]);
        }
        catch(err) {
            console.log("Error in getBookFromGRandUpdateDB", err);
            return;
        }

        await sleep(1500);
    }

    // use this to update a single book
    // getBookFromGRandUpdateDB(bookList.filter(item => item.bookId == 73)[0]);

}

function getBookFromGRandUpdateDB(book) {
    let grID = book["goodReadsID"];
    let url = `https://www.goodreads.com/book/show/${grID}?key=${apiKey}`;
    
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                console.log('GR API Call returned error: ' + response.status);
                return;
            }

            response.text().then(function(data) {
                xml2js.parseString(data, {trim: true}, function (err, result) {
                    if (err) {
                        console.log("Error parsing XML: " + err);
                    }
                    else {
                        updateDB(book, result);
                    }
                });
            })
            .catch(function(err) {
                console.log('Error getting response text: ', err);
            });
        })
        .catch(function(err) {
            console.log('GR API Fetch failed: ', err);
        });
}

function updateDB(book, grResponseObject) {
    // this will print the entire object to the console
    // console.log(util.inspect(result, false, null));

    if (!grResponseObject || !grResponseObject["GoodreadsResponse"] || !grResponseObject["GoodreadsResponse"]["book"]) {
        console.log("malformed response for bookID: " + bookID);
        return;
    }

    const bookResponse = grResponseObject["GoodreadsResponse"]["book"][0];

    // console.log(book["bookId"] + ": " + bookResponse.title[0]);
    // console.log(JSON.stringify(book));
    console.log(util.inspect(bookResponse, false, null));

    // update the relevant GR fields
    try {
        book.gR_Author = bookResponse.authors[0]["author"][0]["name"][0];
        book.gR_OriginalPublicationYear = bookResponse.work[0]["original_publication_year"][0]["_"];
        book.gR_Rating = bookResponse.average_rating[0];
        book.gR_RatingCount = bookResponse.work[0]["ratings_count"][0]["_"];
        book.gR_ReviewCount = bookResponse.work[0]["text_reviews_count"][0]["_"];
        book.gR_Status = "OK";
        book.gR_Status_Message = "";
        book.gR_SyncDate = new Date().toISOString();
        book.gR_Title = bookResponse.title[0];
    }
    catch(err) {
        book.gR_Status = "Error";
        book.gR_Status_Message = err.toString();
    }
    
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
        console.log("Error on update", err);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
