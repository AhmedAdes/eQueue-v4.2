CREATE DATABASE eQueueing COLLATE Arabic_CI_AI_KS
GO
USE eQueueing
GO

CREATE TABLE Company
(
	CompID INT IDENTITY(1,1) NOT NULL,
	CompName NVARCHAR(300),
	Country NVARCHAR(100),
	City NVARCHAR(100),
	Logo VARBINARY(max),
	CompType NVARCHAR(50),
	CompAddress NVARCHAR(max),
	Phone NVARCHAR(50),
	Mobile NVARCHAR(50),
	Website NVARCHAR(50),
	Email NVARCHAR(200), 
	Fax NVARCHAR(200), 
	--Notes NVARCHAR(max),
	[Description] NVARCHAR(max),
	WorkField NVARCHAR(100),
	DefaultLanguage NVARCHAR(20),
	[Disabled] BIT DEFAULT 0,	-- for ADMIN Use Only
	CONSTRAINT PK_Company PRIMARY KEY CLUSTERED (CompID)
)
CREATE TABLE Branch
(
	BranchID INT IDENTITY(1,1) NOT NULL,
	CompID INT,
	BranchName NVARCHAR(300),
	Country NVARCHAR(100),
	City NVARCHAR(100),
	BranchAddress NVARCHAR(max),
	Phone NVARCHAR(50),
	Mobile NVARCHAR(50),
	Email NVARCHAR(200), 
	Fax NVARCHAR(200), 
	[Disabled] BIT DEFAULT 0, -- For CompanyAdmin Use
	CONSTRAINT PK_Branch PRIMARY KEY CLUSTERED (BranchID)
)
CREATE TABLE CompDept
(
	DeptID INT IDENTITY(1,1) NOT NULL,
	CompID INT,
	DeptName NVARCHAR(300),
	RangeFrom INT,
	RangeTo INT,
	Letter NCHAR(1),
	[Disabled] BIT DEFAULT 0, -- For CompanyAdmin Use	
	CONSTRAINT PK_CompDept PRIMARY KEY CLUSTERED (DeptID)
)
CREATE TABLE BranchDepts
(
	BranchID INT, 
	DeptID INT,
	CONSTRAINT PK_BranchDepts PRIMARY KEY (BranchID, DeptID)
)
CREATE TABLE DeptServices
(
	ServID INT IDENTITY(1,1) NOT NULL,
	DeptID INT,
	ServName NVARCHAR(300),
	[Disabled] BIT DEFAULT 0, -- For CompanyAdmin Use	
	CONSTRAINT PK_DeptServices PRIMARY KEY CLUSTERED (ServID)
)
CREATE TABLE Users 
( --for each provider company there is a default reception ticketing user
	UserID INT IDENTITY(1,1) NOT NULL,
	CompID INT,
	UserName NVARCHAR(200),
	LoginName NVARCHAR(200),
	hashPass BINARY(64),
	UserRole NVARCHAR(50), --(Admin//Anonymous//CompanyAdmin//SuperUser//User)
	EntityType NVARCHAR(50), --( Company // Consumer)
	ManagerID INT, -- (Self Reference)
	CreateDate DATETIME2,
	Phone NVARCHAR(50),
	Mobile NVARCHAR(50),
	Email NVARCHAR(200), 
	AccessFailedCount INT DEFAULT 0, --for stopping the login process 
	Title NVARCHAR(5), --(Mr.//Mrs.//Ms.)
	BranchID INT,
	Salt UNIQUEIDENTIFIER ,
	[Disabled] BIT DEFAULT 0, -- For CompanyAdmin Use	
	CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (UserID)
)
CREATE TABLE UserDepts
(
	UserID INT,
	DeptID INT,
	CONSTRAINT PK_UserDepts PRIMARY KEY CLUSTERED (UserID, DeptID)
)
CREATE TABLE MainQueue
(
	QID INT IDENTITY(1,1) NOT NULL,
	UserID INT, -- The Customer who issued the Ticket
	BranchID INT,
	DeptID INT,
	QLetter NCHAR(1),
	QNumber INT,
	ServiceNo AS QLetter + CAST(QNumber AS NCHAR(5)) PERSISTED,
	RequestDate DATETIME2,
	VisitDate DATE,
	VisitTime TIME, --(Approx.) updated based on cancelation of previous records
	StartServeDT DATETIME2,
	QStatus NVARCHAR(20), -- (Served // Not-Served // Hold // Pending // Not-Attended)
	EndServeDT DATETIME2, --only with Served//Not-Served//Not-Attended
	ServingTime INT, --in seconds Only increment with Hold
	QCurrent BIT,
	QTransfer BIT,
	TransferedFrom INT, -- The Primary Key for the original Q
	UniqueNo NVARCHAR(50),
	ProvUserID INT, --The Employee Served the Customer 
	CONSTRAINT PK_MainQueue PRIMARY KEY CLUSTERED (QID)
)
CREATE TABLE QueueDetails
(
	QID INT,
	DeptID INT,
	ServID INT,
	ServCount INT,
	Notes NVARCHAR(max),
	CONSTRAINT PK_QueueDetails PRIMARY KEY CLUSTERED (QID,DeptID,ServID)
)
CREATE TABLE ArchiveMainQueue
(
	QID INT IDENTITY(1,1) NOT NULL,
	UserID INT, -- The Customer who issued the Ticket
	BranchID INT,
	DeptID INT,
	QLetter NCHAR(1),
	QNumber INT,
	ServiceNo AS QLetter + CAST(QNumber AS NCHAR(5)) PERSISTED,
	RequestDate DATETIME2,
	VisitDate DATE,
	VisitTime TIME, --(Approx.) updated based on cancelation of previous records
	StartServeDT DATETIME2,
	QStatus NVARCHAR(20), -- (Served // Not-Served // Hold // Pending // Not-Attended)
	EndServeDT DATETIME2, --only with Served//Not-Served//Not-Attended
	ServingTime INT, --in seconds Only increment with Hold
	QCurrent BIT,
	QTransfer BIT,
	TransferedFrom INT, -- The Primary Key for the original Q
	UniqueNo NVARCHAR(50),
	ProvUserID INT, --The Employee Served the Customer 
	CONSTRAINT PK_ArchMainQueue PRIMARY KEY CLUSTERED (QID)
)
CREATE TABLE ArchiveQueueDetails
(
	QID INT,
	DeptID INT,
	ServID INT,
	ServCount INT,
	Notes NVARCHAR(max),
	CONSTRAINT PK_ArchQueueDetails PRIMARY KEY CLUSTERED (QID,DeptID,ServID)
)
GO
ALTER TABLE dbo.Branch ADD CONSTRAINT FK_Branch_Company FOREIGN KEY (CompID) REFERENCES dbo.Company(CompID)
ALTER TABLE dbo.CompDept ADD CONSTRAINT FK_CompDept_Company FOREIGN KEY (CompID) REFERENCES dbo.Company(CompID)
ALTER TABLE dbo.BranchDepts ADD CONSTRAINT FK_BranchDepts_Branch FOREIGN KEY (BranchID) REFERENCES dbo.Branch(BranchID)
ALTER TABLE dbo.BranchDepts ADD CONSTRAINT FK_BranchDepts_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.DeptServices ADD CONSTRAINT FK_DeptServices_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.Users ADD CONSTRAINT FK_Users_Company FOREIGN KEY (CompID) REFERENCES dbo.Company(CompID)
ALTER TABLE dbo.Users ADD CONSTRAINT FK_Users_Branch FOREIGN KEY (BranchID) REFERENCES dbo.Branch(BranchID)
ALTER TABLE dbo.Users ADD CONSTRAINT FK_Users_Users FOREIGN KEY (ManagerID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.UserDepts ADD CONSTRAINT FK_UserDepts_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.UserDepts ADD CONSTRAINT FK_UserDepts_Users FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.MainQueue ADD CONSTRAINT FK_MainQueue_Users_customer FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.MainQueue ADD CONSTRAINT FK_MainQueue_Users_provider FOREIGN KEY (ProvUserID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.MainQueue ADD CONSTRAINT FK_MainQueue_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.MainQueue ADD CONSTRAINT FK_MainQueue_Branch FOREIGN KEY (BranchID) REFERENCES dbo.Branch(BranchID)
ALTER TABLE dbo.QueueDetails ADD CONSTRAINT FK_QueueDetails_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.QueueDetails ADD CONSTRAINT FK_QueueDetails_MainQueue FOREIGN KEY (QID) REFERENCES dbo.MainQueue(QID)
ALTER TABLE dbo.QueueDetails ADD CONSTRAINT FK_QueueDetails_DeptServices FOREIGN KEY (ServID) REFERENCES dbo.DeptServices(ServID)
-------------------------------------------
ALTER TABLE dbo.ArchiveMainQueue ADD CONSTRAINT FK_ArchMainQueue_Users_customer FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.ArchiveMainQueue ADD CONSTRAINT FK_ArchMainQueue_Users_provider FOREIGN KEY (ProvUserID) REFERENCES dbo.Users(UserID)
ALTER TABLE dbo.ArchiveMainQueue ADD CONSTRAINT FK_ArchMainQueue_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.ArchiveMainQueue ADD CONSTRAINT FK_ArchMainQueue_Branch FOREIGN KEY (BranchID) REFERENCES dbo.Branch(BranchID)
ALTER TABLE dbo.ArchiveQueueDetails ADD CONSTRAINT FK_ArchQueueDetails_CompDept FOREIGN KEY (DeptID) REFERENCES dbo.CompDept(DeptID)
ALTER TABLE dbo.ArchiveQueueDetails ADD CONSTRAINT FK_ArchQueueDetails_MainQueue FOREIGN KEY (QID) REFERENCES dbo.MainQueue(QID)
ALTER TABLE dbo.ArchiveQueueDetails ADD CONSTRAINT FK_ArchQueueDetails_DeptServices FOREIGN KEY (ServID) REFERENCES dbo.DeptServices(ServID)
GO


ALTER	 PROC AuthenticateUser
@LoginName NVARCHAR(50), @UserPass NVARCHAR(50) AS
IF EXISTS (SELECT TOP 1 UserID FROM dbo.Users WHERE LoginName=@LoginName)
BEGIN
	DECLARE @userID INT
	SET @userID=(SELECT UserID FROM dbo.Users WHERE LoginName=@LoginName 
	AND hashPass=HASHBYTES('SHA2_512', @UserPass+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SELECT 'Authentication failed. Wrong password.' AS Error
       ELSE 
           SELECT UserID, UserName, CompID, BranchID, UserRole, EntityType, Salt FROM dbo.Users WHERE UserID = @userID
END
ELSE
    SELECT 'Authentication failed. User not found.' AS Error
GO

CREATE PROC RegisterUser
@CompID INT, @BranchID INT, @UserName NVARCHAR(200), @LoginName NVARCHAR(200), @UserPass NVARCHAR(50), @UserRole NVARCHAR(50), @EntityType NVARCHAR(50),
@ManagerID INT, @Phone NVARCHAR(50),@Mobile NVARCHAR(50),@Email NVARCHAR(200), @Title NVARCHAR(5)
AS
DECLARE @Salt UNIQUEIDENTIFIER = NEWID()
INSERT dbo.Users
        ( CompID ,BranchID ,UserName ,LoginName ,UserRole ,EntityType ,ManagerID ,Phone ,Mobile ,Email ,Title, 
		hashPass, Salt )
VALUES  ( @CompID, @BranchID, @UserName, @LoginName, @UserRole, @EntityType,  @ManagerID, @Phone, @Mobile, @Email, @Title, 
		HASHBYTES('SHA2_512', @UserPass+CAST(@Salt AS NVARCHAR(36))), @Salt )
GO