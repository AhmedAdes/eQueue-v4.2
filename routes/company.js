var express = require("express");
var router = express.Router();
var sql = require("mssql");
var jwt = require("jsonwebtoken");
var cities = require("./cities.json");
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

router.get("/CountryCities/:id", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
    res.json(cities.filter(c=>c.country == req.params.id));
});

router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.Company`)
    .then(function (ret) { res.json(ret.recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/:id", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.Company Where CompID=${req.params.id}`)
    .then(function (ret) { res.json(ret.recordset[0]); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/allProviders/all", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.Company Where CompType = 'Provider'`)
    .then(function (ret) { res.json(ret.recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/allConsumers/all", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM dbo.Company Where CompType = 'Client'`)
    .then(function (ret) { res.json(ret.recordset); })
    .catch(function (err) {
      if (err) { res.json({ error: err }); console.log(err); }
    });
});
router.get("/checkCompanySetup/:id",function(req,res,next){
  res.setHeader("Conten-Type","application/json");
  var request = new sql.Request(sqlcon);
  request.input("id",req.params.id);
  request.execute("CompanySetupStatus")
  .then(function (ret) {
    res.json(ret.recordset[0]);      
  })
  .catch(function (err) {
    res.json({ error: err });
  });
});
router.get("/getCompId/:id",function(req,res,next){
  res.setHeader("Content-Type","application/json");
  var request = new sql.Request(sqlcon);
  request
  .query(`Select CompID from dbo.Users Where UserID =${req.params.id}`)
  .then(function(ret){
    res.json(ret.recordset[0]);      
  })
  .catch(function(err){
    if(err){res.json({errpr:err});console.log(err);}
  });
});
router.post("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var comp = req.body;
  var request = new sql.Request(sqlcon);
  request.input("CompName", comp.compName);
  request.input("Country", comp.country);
  request.input("City", comp.city);
  request.input("CompType", comp.comptype);
  request.input("CompAddress", comp.compaddress);
  request.input("Phone", comp.phone);
  request.input("Mobile", comp.mobile);
  request.input("Website", comp.website);
  request.input("Email", comp.email);
  request.input("Fax", comp.fax);
  request.input("Description", comp.description);
  request.input("WorkField", comp.workfield);
  request.input("DefaultLanguage", comp.defaultlanguage);
  request.input("Disabled", comp.disabled);

  request.execute("CompanyInsert")
    .then(function (ret) {
      res.json({ returnValue: ret.returnValue,recordset:ret.recordset, affected: ret.rowsAffected[0] });      
    })
    .catch(function (err) {
      res.json({ error: err });
    });
});

router.put('/:id', function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var comp = req.body;
  var request = new sql.Request(sqlcon);
  request.input("CompId", comp.id);
  request.input("CompName", comp.compName);
  request.input("Country", comp.country);
  request.input("City", comp.city);
  request.input("CompAddress", comp.compaddress);
  request.input("Phone", comp.phone);
  request.input("Mobile", comp.mobile);
  request.input("Website", comp.website);
  request.input("Email", comp.email);
  request.input("Fax", comp.fax);
  request.input("Description", comp.description);
  request.input("WorkField", comp.workfield);
  request.input("DefaultLanguage", comp.defaultlanguage);

  request.execute("CompanyUpdate")
    .then(function (ret) {
      res.json({ returnValue: ret.returnValue, affected: ret.rowsAffected[0] });
    })
    .catch(function (err) {
      res.json({ error: err });
    });
});

module.exports = router;