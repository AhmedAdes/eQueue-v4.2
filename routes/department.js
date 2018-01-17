var express = require("express");
var router = express.Router();
var sql = require("mssql");
var jwt = require("jsonwebtoken");
var sqlcon = sql.globalPool;

router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers["authorization"];
  var secret = req.body.salt || req.query.salt || req.headers["salt"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
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

router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.CompDept`)
    .then(function (ret) { res.json(ret.recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/:id(\\+D)", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.CompDept Where DeptID=${req.params.id}`)
    .then(function (recordset) { res.json(recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});

router.get("/CompDept/:compId", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);

  var departments = [];
  var services = [];
  var depts_services = [];
  
  request
    .query(`SELECT * FROM dbo.CompDept Where CompID = ${req.params.compId}`) // Getting All Departments for specific Company 
    .then(function (ret) {
      
      departments = ret.recordset;

      var request = new sql.Request(sqlcon);
      //Getting All Services for Specific Company 
      request.query(`SELECT ds.* FROM dbo.DeptServices ds join CompDept cd on cd.DeptID = ds.DeptID and cd.CompID = ${req.params.compId} `)
        .then(function (ret) {
          services = ret.recordset;

          for (var i = 0; i < departments.length; i++) {
            
            depts_services.push(departments[i]);

            depts_services[i].Services = services.filter(function(obj){
              if(depts_services[i].DeptID === obj.DeptID){                
                return true;
              }
            });
          }
          res.json(depts_services);
        });
    })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});

router.get("/BranchDept/:id(\\+D)", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT d.* FROM dbo.CompDept d JOIN dbo.BranchDepts b ON b.DeptID = d.DeptID
            WHERE b.BranchID = ${req.params.id}`)
    .then(function (ret) { res.json(ret.recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});

router.get("/CheckCompDept/:id", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`Select count(CompId) as CompCount from dbo.CompDept where CompId = ${req.params.id}`)
    .then(function (ret) { res.json(ret.recordset[0]); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});


router.post("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var dept = req.body;

  // Create Table Variable Parameter to Hold Bulk Data (Services)
  var tvp = new sql.Table();
  tvp.columns.add('DeptID', sql.Int);  
  tvp.columns.add('ServName', sql.NVarChar(300));
  tvp.columns.add('Disabled', sql.Bit);
  //Add Data to the Table 
  for (var i = 0; i < dept.Services.length; i++) {
    var deptID = dept.Services[i].DeptID;    
    var servName = dept.Services[i].ServName;
    var disabled = dept.Services[i].Disabled;
    tvp.rows.add(deptID, servName, disabled);
  }

  var request = new sql.Request(sqlcon);

  request.input("CompID", dept.CompID);
  request.input("DeptName", dept.DeptName);
  request.input("RangeFrom", dept.RangeFrom);
  request.input("RangeTo", dept.RangeTo);
  request.input("Letter", dept.Letter);
  request.input("Disabled", dept.Disabled);
  request.input("deptServices", tvp);
  request.execute("CompDeptInsert").
    then(function (ret) {
      res.json(ret.recordset[0].DeptID);
    })
    .catch(function (err) {
      res.json({ error: err });
    })
});

router.put("/:DeptID", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var dept = req.body;

  var request = new sql.Request(sqlcon);
  
  request.input("DeptID", dept.DeptID);  
  request.input("CompID", dept.CompID);
  request.input("DeptName", dept.DeptName);
  request.input("RangeFrom", dept.RangeFrom);
  request.input("RangeTo", dept.RangeTo);
  request.input("Letter", dept.Letter);
  request.input("Disabled", dept.Disabled);  
  request.execute("CompDeptUpdate").
    then(function (ret) {
      res.json(ret.recordset[0]);
    })
    .catch(function (err) {
      res.json({ error: err });
    })
});
module.exports = router;