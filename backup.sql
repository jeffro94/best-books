USE [BooksDB2]
GO

/****** Object:  Table [dbo].[Books]    Script Date: 2/18/2019 3:09:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Books_BK3](
	[BookId] [int] IDENTITY(1,1) NOT NULL,
	[GoodReadsID] [int] NULL,
	[ASIN] [nvarchar](max) NULL,
	[Title] [nvarchar](max) NULL,
	[Author] [nvarchar](max) NULL,
	[YearPublished] [smallint] NULL,
	[YearRevised] [smallint] NULL,
	[WhereHeardAbout] [nvarchar](max) NULL,
	[WhenHeardAbout] [nvarchar](max) NULL,
	[WikipediaURL] [nvarchar](max) NULL,
	[Notes] [nvarchar](max) NULL,
	[Categories] [nvarchar](max) NULL,
	[FlagRead] [bit] NOT NULL,
	[FlagCurrentlyReading] [bit] NOT NULL,
	[FlagPartiallyRead] [bit] NOT NULL,
	[FlagWantToRead] [bit] NOT NULL,
	[WantToReadScore] [smallint] NULL,
	[OwnPrint] [bit] NOT NULL,
	[OwnKindle] [bit] NOT NULL,
	[OwnPDF] [bit] NOT NULL,
	[OwnAudible] [bit] NOT NULL,
	[OwnOtherAudio] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NULL,
	[DateModified] [datetime2](7) NULL,
	[GR_Author] [nvarchar](max) NULL,
	[GR_Rating] [real] NULL,
	[GR_ReviewCount] [int] NULL,
	[GR_Status] [nvarchar](max) NULL,
	[GR_StatusMessage] [nvarchar](max) NULL,
	[GR_SyncDate] [datetime2](7) NULL,
	[GR_Title] [nvarchar](max) NULL,
	[OwnKindleSample] [bit] NOT NULL,
	[GR_OriginalPublicationYear] [int] NULL,
	[GR_RatingCount] [int] NULL,
 CONSTRAINT [PK_Books_BK3] PRIMARY KEY CLUSTERED 
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Books_BK3] ADD  DEFAULT ((0)) FOR [OwnKindleSample]
GO

INSERT INTO [dbo].[Books_BK3]
           ([GoodReadsID]
           ,[ASIN]
           ,[Title]
           ,[Author]
           ,[YearPublished]
           ,[YearRevised]
           ,[WhereHeardAbout]
           ,[WhenHeardAbout]
           ,[WikipediaURL]
           ,[Notes]
           ,[Categories]
           ,[FlagRead]
           ,[FlagCurrentlyReading]
           ,[FlagPartiallyRead]
           ,[FlagWantToRead]
           ,[WantToReadScore]
           ,[OwnPrint]
           ,[OwnKindle]
           ,[OwnPDF]
           ,[OwnAudible]
           ,[OwnOtherAudio]
           ,[DateCreated]
           ,[DateModified]
           ,[GR_Author]
           ,[GR_Rating]
           ,[GR_ReviewCount]
           ,[GR_Status]
           ,[GR_StatusMessage]
           ,[GR_SyncDate]
           ,[GR_Title]
           ,[OwnKindleSample]
           ,[GR_OriginalPublicationYear]
           ,[GR_RatingCount])

select 
            [GoodReadsID]
           ,[ASIN]
           ,[Title]
           ,[Author]
           ,[YearPublished]
           ,[YearRevised]
           ,[WhereHeardAbout]
           ,[WhenHeardAbout]
           ,[WikipediaURL]
           ,[Notes]
           ,[Categories]
           ,[FlagRead]
           ,[FlagCurrentlyReading]
           ,[FlagPartiallyRead]
           ,[FlagWantToRead]
           ,[WantToReadScore]
           ,[OwnPrint]
           ,[OwnKindle]
           ,[OwnPDF]
           ,[OwnAudible]
           ,[OwnOtherAudio]
           ,[DateCreated]
           ,[DateModified]
           ,[GR_Author]
           ,[GR_Rating]
           ,[GR_ReviewCount]
           ,[GR_Status]
           ,[GR_StatusMessage]
           ,[GR_SyncDate]
           ,[GR_Title]
           ,[OwnKindleSample]
           ,[GR_OriginalPublicationYear]
           ,[GR_RatingCount]
from Books