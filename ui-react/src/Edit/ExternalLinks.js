import React from 'react';

const ExternalLinks = (props) => (
  <div>
    <div className="mt-2">
      <a id="linkToA" target="_blank"
        href={ props.book.asin ? `https://www.amazon.com/gp/product/${props.book.asin}` : "" }
        style={ { display: props.book.asin ? "block" : "none" } }
        rel="noopener noreferrer" >
      <img src="/images/a.jpg" height="50px" width="50px" alt="Open in Amazon" /></a>
    </div>
    <div className="mt-2">
      <a id="linkToG" target="_blank"
        href={ props.book.goodReadsID ? `https://www.goodreads.com/book/show/${props.book.goodReadsID}` : "" }
        style={ { display: props.book.goodReadsID ? "block" : "none" } }
        rel="noopener noreferrer" >
        <img src="/images/g.jpg" height="50px" width="50px" alt="Open in GoodReads" /></a>
    </div>
    <div className="mt-2">
      <a id="linkToW" target="_blank"
        href={ props.book.wikipediaURL ? props.book.wikipediaURL : "" }
        style={ { display: props.book.wikipediaURL ? "block" : "none" } }
        rel="noopener noreferrer" >
        <img src="/images/w.jpg" height="50px" width="50px" alt="Open in Wikipedia" /></a>
    </div>
  </div>
);

export default ExternalLinks;