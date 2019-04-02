import React, { Component } from "react";
import { USER_ID, PRIVATE_MODE } from "../Constants";
import "./Next.css";

class Next extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    fetch(`https://localhost:44344/api/books/userId/${ USER_ID }`)
      .then(response => response.json())
      .then(result => {
        // filter out books with private flag, if in private mode
        if (PRIVATE_MODE && result) {
          result = result.filter(book => !book.private);
        }

        //default sort by title
        result.sort((a,b) => a.title > b.title ? 1 : -1); 

        this.setState({
          books: result
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Up Next!</h1>
        <div className="book-tiles">
          { this.state.books.map(book => <BookTile book={ book } key={ book.bookId } />) }
        </div>
      </div>
    );
    ;
  }
}

function BookTile(props) {
  return (
    <div className="book-tile">
      <div>
        <img 
          src={ props.book.gR_ImageUrlSmall || props.book.gR_ImageUrlLarge || "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png" }
          alt="Cover" width="50px" 
        />
      </div>
      <div className="book-title">{ props.book.title }</div>
    </div>
  );
}

export default Next;
