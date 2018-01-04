INSERT dbo.Company
        ( CompName ,Country ,City ,Logo ,CompType ,DefaultLanguage )
VALUES  ( N'Comp1' ,N'Egypt' ,N'PortSaid' ,NULL ,N'Provider' ,N'en-US' ),
( N'Comp2' ,N'Egypt' ,N'Alex' ,NULL ,N'Provider' ,N'en-US' ),
( N'Comp3' ,N'Egypt' ,N'Damietta' ,NULL ,N'Provider' ,N'en-US' ),
( N'Comp4' ,N'Egypt' ,N'Cairo' ,NULL ,N'Provider' ,N'en-US' )
SELECT * FROM dbo.Company


INSERT dbo.Branch
        ( CompID ,BranchName ,Country ,City )
VALUES  ( 1 ,N'Branch1-1' ,N'Egypt' ,N'PortSaid'  ),
( 1 ,N'Branch1-2' ,N'Egypt' ,N'Alex'  ),
( 1 ,N'Branch1-3' ,N'Egypt' ,N'Damietta'  ),
( 1 ,N'Branch1-4' ,N'Egypt' ,N'Cairo'  ),
( 2 ,N'Branch2-1' ,N'Egypt' ,N'Alex'  ),
( 2 ,N'Branch2-2' ,N'Egypt' ,N'Cairo'  )
SELECT * FROM dbo.Branch
SELECT * FROM dbo.CompDept
INSERT dbo.CompDept
        ( CompID ,DeptName ,RangeFrom ,RangeTo ,Letter )
VALUES  ( 1 , N'Dept1-1' ,1 ,10 , N'A' ), 
( 1 , N'Dept1-2' ,11 ,20 , N'B' ),
( 1 , N'Dept1-3' ,21 ,30 , N'C' ),
( 2 , N'Dept2-1' ,1 ,10 , N'D' ),
( 2 , N'Dept2-2' ,400 ,1000 , N'F' )

INSERT dbo.BranchDepts ( BranchID, DeptID )
VALUES  ( 1, 1), (1,2), (2,1),(2,3), (3,2), (4,1),(4,2),(4,3),(5,4),(5,5),(6,4)

INSERT dbo.DeptServices ( DeptID, ServName )
VALUES  ( 1, N'Serv1-1' ), ( 1, N'Serv1-2' ), ( 2, N'Serv2-1' ), ( 2, N'Serv2-1' ), ( 1, N'Serv1-3' ), 
( 3, N'Serv3-1' ), ( 3, N'Serv3-2' ), ( 4, N'Serv4-1' ), ( 4, N'Serv4-2' ), ( 4, N'Serv4-3' ), ( 5, N'Serv5-1' ) 