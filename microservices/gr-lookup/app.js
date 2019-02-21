const express = require('express');
const xml2js = require("xml2js");
const fetch = require("node-fetch");
const util = require('util');
const cors = require('cors');
const apiKey = require('./apiKey');

const app = express();
const port = 3000;

// ref: https://stackoverflow.com/questions/35756453/promisifying-xml2js-parse-function-es6-promises
xml2js.parseStringPromise = util.promisify(xml2js.parseString);

// ref : https://stackoverflow.com/questions/43150051/how-to-enable-cors-nodejs-with-express
// todo: this should probably be cleaned up for production
//
app.use(cors());
app.options('*', cors());

app.get('/book/:bookId', async function(req, res) {

    if (!req.params || !req.params["bookId"]) {
        res.status(500).send("Invalid params!");
    }

    const rawResult = await getBookFromGR(req.params["bookId"]);

    const book = convertRawToReadable(rawResult);

    res.send(book);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function getBookFromGR(bookId) {
    const url = `https://www.goodreads.com/book/show/${bookId}?key=${apiKey}`;

    return fetch(url)
        .then(function(response) {
            if (!response.ok)
                throw `GR API Call returned error: ${response.status}`;

            return response.text().then(function(data) {
                return xml2js.parseStringPromise(data, {trim: true})
                    .then(function (result, err) {
                        if (err)
                            throw `Error parsing XML: ${err}`;

                        return result;
                    });
                });
        })
        .catch(function(err) {
            throw `GR API Fetch failed: ${err}`;
        });
}

function convertRawToReadable(response) {
    const book = {};

    try {
        const bookResponse = response["GoodreadsResponse"]["book"][0];

        book.gR_Id = bookResponse.id[0];
        book.gR_Title = bookResponse.title[0];
        book.gR_Author = bookResponse.authors[0]["author"][0]["name"][0];
        book.gR_OriginalPublicationYear = bookResponse.work[0]["original_publication_year"][0]["_"];
        book.gR_Rating = bookResponse.average_rating[0];
        book.gR_RatingCount = bookResponse.work[0]["ratings_count"][0]["_"];
        book.gR_ReviewCount = bookResponse.work[0]["text_reviews_count"][0]["_"];
        book.gR_Status = "OK";
    }
    catch(err) {
        book.gR_Status = "Error";
        book.gR_Status_Message = err.toString();
    }

    return book;
}