CREATE  DATABASE eQueueing
GO

USE eQueueing
GO

CREATE TABLE Users
(
	UserID INT IDENTITY(1,1) NOT NULL,
	UserName NVARCHAR(200),
	LoginName NVARCHAR(50),
	hashPassword BINARY(64),
	Salt UNIQUEIDENTIFIER ,
	CONSTRAINT PK_Users PRIMARY KEY (UserID)	
)

DECLARE @Salt UNIQUEIDENTIFIER = NEWID()
INSERT dbo.Users
        ( UserName ,LoginName ,hashPassword ,Salt )
VALUES  ( N'Admin' , -- UserName - nvarchar(200)
          N'admin' , -- LoginName - nvarchar(50)
          HASHBYTES('SHA2_512', N'123456' + CAST(@Salt AS NVARCHAR(36))) , -- hashPassword - binary
          @Salt  -- Salt - uniqueidentifier
        )	
GO
CREATE PROC AuthenticateUser
@LoginName NVARCHAR(50), @UserPass NVARCHAR(50) AS
IF EXISTS (SELECT TOP 1 UserID FROM dbo.Users WHERE LoginName=@LoginName)
BEGIN
	DECLARE @userID INT
	SET @userID=(SELECT UserID FROM dbo.Users WHERE LoginName=@LoginName AND hashPassword=HASHBYTES('SHA2_512', @UserPass+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SELECT 'Authentication failed. Wrong password.' AS Error
       ELSE 
           SELECT UserID, UserName FROM dbo.Users WHERE UserID = @userID
END
ELSE
    SELECT 'Authentication failed. User not found.' AS Error
GO