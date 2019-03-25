export const TableColumns = [
  {
    key: "flagRead",
    name: "Completed",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
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
      style: { width: "5%" }
    },
    headerTitle: "Currently Reading",
    headerAbbreviation: "🕮",
    defaultSort: "desc"
  },
  {
    key: "flagWantToRead",
    name: "Want to Read",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
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
      style: { width: "5%" }
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
    attributes: {
      className: "text-truncate",
    },
    headerAttributes: { 
      style: { width: "45%" }
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
      style: { width: "20%" }
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
      style: { width: "10%" }
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
      style: { width: "12%" }
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
      style: { width: "12%" }
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
      style: { width: "10%" }
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
      style: { width: "10%" }
    },
    defaultSort: "desc"
  }
];