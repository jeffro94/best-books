export const TableColumns = [
  {
    key: "coverImage",
    name: "Cover Image",
    selected: true,
    attributes: { className: "d-none d-xl-table-cell cover-image" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "50px", minWidth: "50px", maxWidth: "50px" }
    },
    headerTitle: "Cover Image",
    headerAbbreviation: "📷",
    defaultSort: "none"
  },
  {
    key: "flagRead",
    name: "Completed",
    selected: false,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "28px" }
    },
    headerTitle: "Completed",
    headerAbbreviation: "📗",
    defaultSort: "desc"
  },
  {
    key: "flagCurrentlyReading",
    name: "Currently Reading",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "28px" }
    },
    headerTitle: "Currently Reading",
    headerAbbreviation: "🕮",
    defaultSort: "desc"
  },
  {
    key: "flagWantToRead",
    name: "Want to Read",
    selected: false,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "28px" }
    },
    headerTitle: "Want to Read",
    headerAbbreviation: "🛒",
    defaultSort: "desc"
  },
  {
    key: "wantToReadScore",
    name: "Want to Read Score",
    selected: false,
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "28px" }
    },
    headerTitle: "Want to Read Score",
    headerAbbreviation: "💯",
    defaultSort: "desc"
  },
  {
    key: "title",
    name: "Title",
    selected: true,
    showTitle: true,
    attributes: { className: "text-truncate" },
    headerAttributes: { 
      style: { width: "60%" }
    },
    defaultSort: "asc"
  },
  {
    key: "author",
    name: "Author",
    selected: true,
    showTitle: true,
    attributes: {
      className: "text-truncate d-none d-md-table-cell",
    },
    headerAttributes: { 
      className: "d-none d-md-table-cell",
      style: { width: "40%" }
    },
    defaultSort: "asc"
  },
  {
    key: "yearPublished",
    name: "Year",
    selected: true,
    attributes: {
      className: "d-none d-lg-table-cell"
    },
    headerAttributes: { 
      className: "d-none d-lg-table-cell",
      style: { width: "65px" }
    },
    defaultSort: "desc"
  },
  {
    key: "yearRevised",
    name: "Year Revised",
    selected: false,
    attributes: {
      className: "d-none d-xl-table-cell"
    },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "65px" }
    },
    defaultSort: "desc"
  },
  {
    key: "gR_Rating",
    name: "Goodreads\nRating",
    selected: false,
    transform: val => val ? val.toFixed(1) : "",
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "70px" }
    },
    defaultSort: "desc"
  },
  {
    key: "gR_RatingCount",
    name: "Goodreads\nCount",
    selected: false,
    transform: val => (val != null) ? val.toLocaleString() : "", /* allows for 0 */
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "70px" }
    },
    defaultSort: "desc"
  },
  {
    key: "amz_Rating",
    name: "Amazon\nRating",
    selected: false,
    transform: val => val ? val.toFixed(1) : "",
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "60px" }
    },
    defaultSort: "desc"
  },
  {
    key: "amz_ReviewCount",
    name: "Amazon\nCount",
    selected: false,
    transform: val => (val != null) ? val.toLocaleString() : "", /* allows for 0 */
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "60px" }
    },
    defaultSort: "desc"
  }
];