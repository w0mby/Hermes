
CREATE TABLE Teams (
    TeamID INT PRIMARY KEY IDENTITY,
    TeamName NVARCHAR(255),
    DateCreated DATETIME
);

-- Stores information about each report template
CREATE TABLE ReportTemplates (
    TemplateID INT PRIMARY KEY IDENTITY,
    DateCreated DATETIME
);

-- Stores individual blocks that can be used to compose elements
CREATE TABLE Blocks (
    BlockID INT PRIMARY KEY IDENTITY,
    BlockType NVARCHAR(50),         -- 'Single', 'Double', 'Triple' to indicate the block size
    HTMLTemplate NVARCHAR(MAX),     -- HTML template to define the block's content layout and style
    TextContent NVARCHAR(MAX), 
    ImageUrl NVARCHAR(512), 
    BackgroundColor NVARCHAR(50),
    TextColor NVARCHAR(50), 
    BorderWeight INT, 
    BorderColor NVARCHAR(50)      
);

-- Stores the elements composed of one or more blocks
CREATE TABLE Elements (
    ElementID INT PRIMARY KEY IDENTITY,
    ElementType NVARCHAR(50)  -- 'Header', 'Footer', 'Custom'
);

-- Association table defining which blocks make up an element
CREATE TABLE ElementBlocks (
    ElementBlockID INT PRIMARY KEY IDENTITY,
    ElementID INT FOREIGN KEY REFERENCES Elements(ElementID),
    BlockID INT FOREIGN KEY REFERENCES Blocks(BlockID),
    Position INT,
    UNIQUE (ElementID, Position)
);

-- Stores the final report instances with references to the template used
CREATE TABLE Reports (
    ReportID INT PRIMARY KEY IDENTITY,
    TemplateID INT FOREIGN KEY REFERENCES ReportTemplates(TemplateID),
    TeamID INT FOREIGN KEY REFERENCES Teams(TeamID),
    Title NVARCHAR(255), 
    LogoUrl NVARCHAR(512), 
    DateCreated DATETIME,
    LastModified DATETIME
);

-- Association table that defines which elements are in which reports
CREATE TABLE ReportElements (
    ReportElementID INT PRIMARY KEY IDENTITY,
    ReportID INT FOREIGN KEY REFERENCES Reports(ReportID),
    ElementID INT FOREIGN KEY REFERENCES Elements(ElementID),
    SortOrder INT,
    UNIQUE (ReportID, SortOrder)
);