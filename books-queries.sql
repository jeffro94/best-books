SELECT TOP (1000) *
  FROM [BooksDB2].[dbo].[Books]

select * from Books
where gR_Status <> 'OK'

update Books 
set UserId = 1
where BookId = 154

select bookId, ASIN from Books

update Books
set ASIN = null

create table tmpASIN (
  BookID int,
  ASIN varchar(255)
)

select * from tmpASIN

update b
set b.ASIN = t.ASIN

from Books as b
inner join tmpASIN t
  on b.BookId = t.BookID