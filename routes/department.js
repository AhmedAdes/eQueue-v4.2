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
    .query(`SELECT * FROM dbo.CompDept`)
    .then(function(ret) { res.json(ret.recordset); })
    .catch(function(err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/:id(\\d+)", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.CompDept Where DeptID=${req.params.id}`)
    .then(function(ret) { res.json(ret.recordset); })
    .catch(function(err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/CompDept/:id(\\d+)", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.CompDept Where CompID = ${req.params.id}`)
    .then(function(ret) { res.json(ret.recordset); })
    .catch(function(err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/BranchDept/:id(\\d+)", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT d.* FROM dbo.CompDept d JOIN dbo.BranchDepts b ON b.DeptID = d.DeptID
            WHERE b.BranchID = ${req.params.id}`)
    .then(function(ret) { res.json(ret.recordset); })
    .catch(function(err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});


module.exports = router;