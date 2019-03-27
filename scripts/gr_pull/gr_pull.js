const fetch = require("node-fetch");
const util = require("util");

// this is only to allow node to work with the self-signed cert on localhost https
// it should be removed once the API is moved to cloud host
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

(async () => {

    const books = await fetch("https://localhost:44344/api/books")
        .then(response => response.json())
        .catch(err => { 
            console.error("Call to local books API failed", err);
            return;
        });

    // const bookList = books.filter(book => book.gR_Status !== "OK");

    const bookList = books.filter(book => book.goodReadsID);

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
            console.error("Error: ", err);
        }
    }
})();

async function getBookFromGR(book) {
    const response = await fetch(`http://localhost:3010/book/${book.goodReadsID}`);
    
    if (!response.ok)
        throw new Error('GR API Call returned error: ' + response.status);

    return response.json();
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
    book.gR_ImageUrlSmall = apiResponse.gR_ImageUrlSmall;
    book.gR_ImageUrlMedium = apiResponse.gR_ImageUrlMedium;
    book.gR_SyncDate = new Date().toISOString();

    // now update it in the DB
    return (
        fetch(`https://localhost:44344/api/books/${book.bookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (!response.ok)
                throw new Error(`Error on update: ${response.status}`);
        })
        .catch(err => { throw new Error(`Error on update: ${err.toString()}`) } ));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
