import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faBook, faBookReader, faShoppingCart, faTachometerAlt } from "@fortawesome/free-solid-svg-icons"

export const TableColumns = [
  {
    key: "coverImage",
    name: "Cover Image",
    selected: true,
    sort: coverImageSort,
    attributes: { className: "d-none d-xl-table-cell cover-image" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "50px", textAlign: "center" }
    },
    headerTitle: "Cover Image",
    headerAbbreviation: <FontAwesomeIcon icon={ faCamera } />,
    defaultSort: "none"
  },
  {
    key: "flagRead",
    name: "Completed",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "30px", textAlign: "center" }
    },
    headerTitle: "Completed",
    headerAbbreviation: <FontAwesomeIcon icon={ faBook } />,
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
      style: { width: "30px", textAlign: "center" }
    },
    headerTitle: "Currently Reading",
    headerAbbreviation: <FontAwesomeIcon icon={ faBookReader } />,
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
      style: { width: "30px", textAlign: "center" }
    },
    headerTitle: "Want to Read",
    headerAbbreviation: <FontAwesomeIcon icon={ faShoppingCart } />,
    defaultSort: "desc"
  },
  {
    key: "wantToReadScore",
    name: "Want to Read Score",
    selected: false,
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "30px", textAlign: "center" }
    },
    headerTitle: "Want to Read Score",
    headerAbbreviation: <FontAwesomeIcon icon={ faTachometerAlt } />,
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
    defaultSort: "asc",
    disabled: true
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
    name: "Goodreads\nRatings",
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
    name: "Amazon\nReviews",
    selected: false,
    transform: val => (val != null) ? val.toLocaleString() : "", /* allows for 0 */
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "60px" }
    },
    defaultSort: "desc"
  },
  {
    key: "dateCompleted",
    name: "Date Completed",
    selected: false,
    transform: val => val ? moment(val).format("MM/DD/YYYY") : "",
    sort: dateCompletedSort,
    attributes: {
      className: "d-none d-xl-table-cell"
    },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "80px" }
    },
    defaultSort: "desc"
  }
];

function dateCompletedSort(a,b) {
  const aDate = a.dateCompleted ? moment(a.dateCompleted) : moment("0001-01-01");
  const bDate = b.dateCompleted ? moment(b.dateCompleted) : moment("0001-01-01");

  return aDate.isBefore(bDate) ? -1 : 1;
}

function coverImageSort(a,b) {
  if ((a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && !(b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return 1;
  if (!(a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && (b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return -1;
  else return 0;
}