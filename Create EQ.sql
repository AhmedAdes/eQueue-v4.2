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
	ServTime INT, -- in Minutes
	[Disabled] BIT DEFAULT 0, -- For CompanyAdmin Use	
	CONSTRAINT PK_DeptServices PRIMARY KEY CLUSTERED (ServID)
)
CREATE TABLE Users 
( --for each provider company there is a default reception ticketing user
	UserID INT IDENTITY(1,1) NOT NULL,
	CompID INT,
	UserName NVARCHAR(200),
	hashPass BINARY(64),
	UserRole NVARCHAR(50), --(Admin//Anonymous//CompanyAdmin//SuperUser//User)
	EntityType TINYINT, --( Company // Consumer)
	ManagerID INT, -- (Self Reference)
	CreateDate DATETIME2,
	Phone NVARCHAR(50),
	Mobile NVARCHAR(50),
	Email NVARCHAR(200) NOT NULL UNIQUE, 
	AccessFailedCount INT DEFAULT 0, --for stopping the login process 
	Title NVARCHAR(200), --Job Title
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
	QNumber VarChar(4),
	ServiceNo AS CAST(QNumber AS NCHAR(4)) +'-'+ QLetter PERSISTED,
	RequestDate DATETIME2,
	VisitDate DATE,
	VisitTime TIME, --(Approx.) updated based on cancelation of previous records
	StartServeDT DATETIME2,
	QStatus NVARCHAR(20), -- (Served // Hold // Pending // Not-Attended // Waiting // Current // Transferred)
	EndServeDT DATETIME2, --only with Served//Not-Served//Not-Attended
	ServingTime INT, --in seconds Only increment with Hold
	QCurrent BIT,
	QTransfer BIT,
	TransferedFrom INT, -- The Primary Key for the original Q
	UniqueNo NVARCHAR(50),
	ProvUserID INT, --The Employee Served the Customer 
	EstUserNo INT,
	EstServingTime INT,
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
	QID INT NOT NULL,
	UserID INT, -- The Customer who issued the Ticket
	BranchID INT,
	DeptID INT,
	QLetter NCHAR(1),
	QNumber INT,
	ServiceNo NvarChar(6),
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
ALTER TABLE dbo.ArchiveQueueDetails ADD CONSTRAINT FK_ArchQueueDetails_ArchiveMainQueue FOREIGN KEY (QID) REFERENCES dbo.ArchiveMainQueue(QID)
ALTER TABLE dbo.ArchiveQueueDetails ADD CONSTRAINT FK_ArchQueueDetails_DeptServices FOREIGN KEY (ServID) REFERENCES dbo.DeptServices(ServID)
GO


CREATE PROC AuthenticateUser
@LoginName NVARCHAR(50), @UserPass NVARCHAR(50) AS
IF EXISTS (SELECT TOP 1 UserID FROM dbo.Users WHERE Email=@LoginName)
BEGIN
	DECLARE @userID INT
	SET @userID=(SELECT UserID FROM dbo.Users WHERE Email=@LoginName 
	AND hashPass=HASHBYTES('SHA2_512', @UserPass+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SELECT 'Authentication failed. Wrong password.' AS Error
       ELSE 
           SELECT UserID, UserName, CompID, BranchID, UserRole, EntityType, Salt FROM dbo.Users WHERE UserID = @userID
END
ELSE
    SELECT 'Authentication failed. User not found.' AS Error
GO


DECLARE @Salt UNIQUEIDENTIFIER = NEWID()
INSERT dbo.Users
        ( UserName ,Email ,hashPass ,Salt ,UserRole )
VALUES  ( N'Admin' , -- UserName - nvarchar(200)
          N'admin@admin.com' , -- LoginName - nvarchar(50)
          HASHBYTES('SHA2_512', N'123456' + CAST(@Salt AS NVARCHAR(36))) , -- hashPassword - binary
          @Salt  -- Salt - uniqueidentifier
		  ,'SysAdmin'
        )	
GO


CREATE PROC RegisterUser
@CompID INT, @BranchID INT, @UserName NVARCHAR(200), @UserPass NVARCHAR(50), @UserRole NVARCHAR(50), @EntityType TINYINT,
@ManagerID INT, @Phone NVARCHAR(50),@Mobile NVARCHAR(50),@Email NVARCHAR(200), @Title NVARCHAR(5)
AS
DECLARE @Salt UNIQUEIDENTIFIER = NEWID()
INSERT dbo.Users
        ( CompID ,BranchID ,UserName ,UserRole ,EntityType ,ManagerID ,Phone ,Mobile ,Email ,Title, 
		hashPass, Salt )
VALUES  ( @CompID, @BranchID, @UserName, @UserRole, @EntityType,  @ManagerID, @Phone, @Mobile, @Email, @Title, 
		HASHBYTES('SHA2_512', @UserPass+CAST(@Salt AS NVARCHAR(36))), @Salt )
GO


CREATE  PROC CompanyInsert
@CompName nvarchar(300),@Country nvarchar(100), @City nvarchar(100), 
@CompType nvarchar(50),@CompAddress nvarchar(max),@Phone nvarchar(50),@Mobile nvarchar(50),
@Website nvarchar(50),@Email nvarchar(200),@Fax nvarchar(200),@Description nvarchar(max),
@WorkField nvarchar(100),@DefaultLanguage nvarchar(20),@Disabled bit AS
INSERT dbo.Company
(CompName,Country,City,CompType,CompAddress,Phone,Mobile,Website,Email,Fax,Description,WorkField, DefaultLanguage	,Disabled)
Values	
(@CompName,@Country,@City,@CompType,@CompAddress,@Phone,@Mobile,@Website,@Email,@Fax,@Description,@WorkField,@DefaultLanguage,@Disabled)
select IDENT_CURRENT('dbo.Company')
GO

CREATE PROC	CompanyUpdate
@CompId INT ,@CompName nvarchar(300),@Country nvarchar(100), @City nvarchar(100)
,@Logo varbinary(max),@CompAddress nvarchar(max),@Phone nvarchar(50),@Mobile nvarchar(50),
@Website nvarchar(50),@Email nvarchar(200),@Fax nvarchar(200),@Description nvarchar(max),
@WorkField nvarchar(100),@DefaultLanguage nvarchar(20) AS
UPDATE dbo.Company 
SET 
CompName = @CompName , Country = @Country , City = @City , Logo = @Logo,
CompAddress = @CompAddress , Phone = @Phone, Mobile = @Mobile , Website = @Website ,
Email = @Email , Fax = @Fax , [Description] = @Description , WorkField = @WorkField,
DefaultLanguage = @DefaultLanguage 
WHERE CompID = @CompId
GO

CREATE PROC CompanyValidate
@CompId INT,@Disabled bit AS
UPDATE dbo.Company
SET 
[Disabled] = @Disabled
WHERE CompID = @CompId
GO

CREATE PROC CompanyDelete
@CompId INT AS
DELETE dbo.Company
WHERE CompID = @CompId
GO
Create Function LPAD(@Num INT, @Replace Char(1), @Length INT)
Returns NvarChar(max)
begin
	Declare @Out NvarChar(max) = right(replicate(@Replace,@Length)+cast(@Num as varchar(15)),@Length)
	Return @Out
end
GO

CREATE TYPE tpQueueDetails AS TABLE
(
	QID INT,
	DeptID INT,
	ServID INT,
	ServCount INT,
	Notes NVARCHAR(max)
)
GO
CREATE PROC UpdateVisitTime (@QID INT, @BranchID INT, @DeptID INT, @VisitDate DATE) 
AS
	DECLARE @OpenTime TIME='08:00:00', @Order INT, @VisitTime TIME, @UserNO INT= 0
	DECLARE @UserCount INT = (SELECT COUNT(ud.UserID) FROM dbo.UserDepts ud JOIN dbo.Users u ON u.UserID = ud.UserID 
		WHERE DeptID = @DeptID AND u.BranchID=@BranchID)

	DECLARE @tbl TABLE (QID INT, BranchID INT, ServiceNo NVARCHAR(10), VisitTime TIME, QStatus NVARCHAR(20), EstUserNo INT,
		EstServingTime INT)
	INSERT @tbl 
	SELECT QID, BranchID, ServiceNo, VisitTime, QStatus, EstUserNo, EstServingTime 
	FROM dbo.MainQueue WHERE BranchID=@BranchID AND DeptID=@DeptID AND VisitDate=@VisitDate 

	SELECT @Order = STK.QOrder FROM ( 
	SELECT QID, QStatus, ROW_NUMBER() OVER ( ORDER BY QID ) AS QOrder  FROM @tbl WHERE QStatus IN ('Waiting') ) STK WHERE STK.QID = @QID
	IF (@Order = 1) 
		BEGIN
			SET @VisitTime = @OpenTime 
			SET @UserNO = 1
		END
		ELSE	
			IF (@UserCount >= @Order) 
			BEGIN
				SET @VisitTime = @OpenTime 
				IF ( @UserNO < @UserCount ) 
				BEGIN
					SET @UserNO = (SELECT MAX(EstUserNo) + 1 FROM @tbl)
				END
			END	
			ELSE
			BEGIN
				SELECT TOP 1 @VisitTime = QRY.VisTime, @UserNO = QRY.EstUserNo FROM (
				SELECT MAX(DATEADD(MINUTE, EstServingTime, VisitTime)) VisTime, EstUserNo 
				FROM @tbl WHERE VisitTime IS NOT NULL
				GROUP BY EstUserNo ) QRY ORDER BY QRY.VisTime ASC	
			END
	UPDATE dbo.MainQueue SET VisitTime= @VisitTime, EstUserNo=@UserNO WHERE QID=@QID
GO

ALTER Proc IssueTicket
	@CompID int, @DeptID INT, @BranchID INT, @UserID INT, @VisitDate DATE, @QueueDetails tpQueueDetails READONLY
as
	DECLARE @ServSerial INT,  @VisTime TIME, @cQID INT 
	DECLARE @UserCount INT = (SELECT COUNT(UserID) FROM dbo.UserDepts WHERE DeptID = @DeptID)
	Select @ServSerial= ISNULL(MAX(QNumber), 0) +1 FROM MainQueue Where BranchID=@BranchID and DeptID=@DeptID
	DECLARE @ServLetter nvarchar(5) = (Select Letter From CompDept Where DeptID=@DeptID )
	DECLARE @TotSrvTime INT = (SELECT SUM(ServCount * s.ServTime) FROM @QueueDetails q JOIN dbo.DeptServices s ON s.ServID = q.ServID)
	DECLARE @LastServTime TIME = (SELECT ISNULL(VisitTime, '08:00:00') FROM dbo.MainQueue WHERE DeptID=@DeptID AND QNumber=@ServSerial-1)

	INSERT MainQueue 
			(BranchID, DeptID, VisitDate, VisitTime, UserID, QLetter, QNumber, RequestDate, QStatus, UniqueNo, EstServingTime)
	VALUES (@BranchID, @DeptID, @VisitDate, DATEADD(MINUTE, 20, @VisTime), @UserID, @ServLetter, dbo.LPAD(@ServSerial, '0', 4), GETDATE(), 
			'Waiting', ABS(CAST(NEWID() AS binary(6)) % 10000) + 1, @TotSrvTime)
	SELECT @cQID = IDENT_CURRENT('MainQueue') From MainQueue 

	EXEC dbo.UpdateVisitTime @QID = @cQID, -- int
		@BranchID = @BranchID, -- int
		@DeptID = @DeptID, -- int
		@VisitDate = @VisitDate -- date

	INSERT dbo.QueueDetails
			( QID, DeptID, ServID, ServCount, Notes )
	SELECT @cQID, DeptID, ServID, ServCount, Notes FROM @QueueDetails

	Select QID, ServiceNo, UniqueNo, VisitTime, EstUserNo From MainQueue Where QID = @cQID
GO

