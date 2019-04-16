import React, { Component } from "react";
import "./Next.css";
import { bookService } from "../_services";

class Next extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    document.title = "Best Books! - Up Next";

    if (this.props.currentUser) {
      this.getBooks();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) {
      this.getBooks();
    }
  }

  getBooks() {
    bookService.getAllByUserId(this.props.currentUser.userId)
      .then(result => {
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
