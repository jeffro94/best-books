const fetch = require("node-fetch");
const util = require("util");

// this is only to allow node to work with the self-signed cert on localhost https
// it should be removed once the API is moved to cloud host
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let bookList = [];
(async () => {

    const books = await fetch("https://localhost:44344/api/books/UserId/2")
        .then(response => response.json())
        .catch(err => console.error("Call to local books API failed", err) );

    const bookList = books.filter(book => book.gR_Status !== "OK");

    // update a single book
    // const bookList = books.filter(book => book.bookId == 73));

    for (let i = 0; i < bookList.length; i++) {  
        try {
            console.log("Processing " + bookList[i].title);
            const grData = await getBookFromGR(bookList[i]);

            await updateDB(bookList[i], grData);

            await sleep(1200);
        }
        catch(err) {
            console.error("Error in getBookFromGRandUpdateDB", err);
        }
    }

})();

async function getBookFromGR(book) {    
    return await fetch(`http://localhost:3010/book/${book.goodReadsID}`)
        .then(response => {
            if (!response.ok) {
                console.error('GR API Call returned error: ' + response.status);
                return;
            }

            return response.json();
        })
        .catch(err => {
            console.error('Error getting response text: ', err);
            return;
        });
}

async function updateDB(book, apiResponse) {
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
    return (
        fetch(`https://localhost:44344/api/books/${book.bookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(book)
        })
        .then(function(response) {
            if (!response.ok) { 
                console.error("Error on update: " + response.status);
            }
        })
        .catch(function(err) {
            console.error("Error on update: ", err);
        }));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
