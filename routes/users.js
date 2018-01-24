var express = require("express");
var router = express.Router();
var sql = require("mssql");
var jwt = require("jsonwebtoken"); 
var sqlcon = sql.globalPool;

router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers["authorization"];
  var secret = req.body.salt || req.query.salt || req.headers["salt"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: "Failed to authenticate token." });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ success: false, message: "No token provided." });
  }
});

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query("SELECT * FROM dbo.Users")
    .then(function(ret) {
      res.json(ret.recordset);
    })
    .catch(function(err) {
      if (err) {
        res.json({ error: err });
        console.log(err);
      }
    });
});
router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query("SELECT * FROM dbo.Users Where UserID=" + req.params.id)
    .then(function(ret) {
      res.json(ret.recordset);
    })
    .catch(function(err) {
      if (err) {
        res.json({ error: err });
        console.log(err);
      }
    });
});
router.get("/compUsers/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query("SELECT * FROM dbo.Users Where UserID=" + req.params.id)
    .then(function(ret) {
      res.json(ret.recordset);
    })
    .catch(function(err) {
      if (err) {
        res.json({ error: err });
        console.log(err);
      }
    });
});
router.get("/compAdm/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT UserRole, ISNULL(CompID, 0) CompID FROM dbo.Users Where UserID=${req.params.id}`)
    .then(function(ret) {
      res.json(ret.recordset);
    })
    .catch(function(err) {
      if (err) {
        res.json({ error: err });
        console.log(err);
      }
    });
});
// Update CompID in dbo.users once Company Created 
router.put("/RegUserComp/:id",function(req,res,next){
   res.setHeader("Content-Type","application/json");
   var user = req.body;
   var request= new sql.Request(sqlcon);
   console.log(user);
   request.input("UserID",user.uID);  
   request.input("CompID",user.cID);

   request.execute("UserCompanyUpdate")
   .then(function(ret){
      res.json({returnValue : ret.returnValue , affected : ret.rowsAffected[0]});
   })
   .catch(function(err){
      res.json({error : err});
   });
});

router.post("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var user = req.body.basic;
  
  var tvp = new sql.Table();
  tvp.columns.add('UserID', sql.INT);
  tvp.columns.add('DeptID', sql.INT);
  for (var i = 0; i < user.Departments.length; i++) {
    var userID = 0;
    var deptID = user.Departments[i].DeptID;
    tvp.rows.add(userID, deptID);
  }
  var request = new sql.Request(sqlcon);

  request.input("CompID", user.CompID);
  request.input("BranchID", user.BranchID);
  request.input("ManagerID", user.ManagerID);
  request.input("UserName", user.UserName);
  request.input("UserPass", user.UserPass);
  request.input("UserRole", user.UserRole);
  request.input("EntityType", user.EntityType);
  request.input("Phone", user.Phone);
  request.input("Mobile", user.Mobile);
  request.input("Email", user.Email);
  request.input("Title", user.Title);
  request.input("Disabled", user.Disabled);
  request.input("UserDepts", tvp);
  request.execute("CompUserInsert").
    then(function (ret) {
      res.json(ret.recordset[0].UserID);
    })
    .catch(function (err) {
      res.json({ error: err });
    })
});

router.put("/:id", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var user = req.body.basic;
  
  var tvp = new sql.Table();
  tvp.columns.add('UserID', sql.INT);
  tvp.columns.add('DeptID', sql.INT);
  for (var i = 0; i < user.Departments.length; i++) {
    var userID = 0;
    var deptID = user.Departments[i].DeptID;
    tvp.rows.add(userID, deptID);
  }
  var request = new sql.Request(sqlcon);

  request.input("UserID", user.UserID);  
  request.input("CompID", user.CompID);
  request.input("BranchID", user.BranchID);
  request.input("ManagerID", user.ManagerID);
  request.input("UserName", user.UserName);  
  request.input("UserRole", user.UserRole);  
  request.input("Phone", user.Phone);
  request.input("Mobile", user.Mobile);
  request.input("Email", user.Email);
  request.input("Title", user.Title);
  request.input("Disabled", user.Disabled);
  request.input("UserDepts", tvp);
  request.execute("CompUserUpdate").
    then(function (ret) {
      res.json(ret.recordset[0].UserID);
    })
    .catch(function (err) {
      res.json({ error: err });
    })
});

module.exports = router;
