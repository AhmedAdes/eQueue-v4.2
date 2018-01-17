var express = require("express");
var router = express.Router();
var sql = require("mssql");
var jwt = require("jsonwebtoken");
var sqlcon = sql.globalConnection;


var firebase = require("firebase");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEzZp-q-FDr6NipFRU3IHAJ0X0Ul9zNHY",
  authDomain: "equeueing-5acb7.firebaseapp.com",
  databaseURL: "https://equeueing-5acb7.firebaseio.com",
  projectId: "equeueing-5acb7",
  storageBucket: "equeueing-5acb7.appspot.com",
  messagingSenderId: "904716700018"
};
firebase.initializeApp(config);
var database = firebase.database();


router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers["authorization"];
  var secret = req.body.salt || req.query.salt || req.headers["salt"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

router.get("/ActiveTickets/:id", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var request = new sql.Request(sqlcon);
  request
    .query(`SELECT * FROM MainQueue WHERE QStatus NOT IN ('Served', 'Not-Attended', 'Transferred') 
            And UserID = ${req.params.id}`)
    .then(function (ret) {
      res.json(ret);
    })
    .catch(function (err) {
      res.json({
        error: err
      });
      console.log(err);
    });
});

router.get("/getToday", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.json(new Date());
});
router.post("/IssueNew", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let det = req.body.tckt
  
  let tvp = new sql.Table()
  tvp.columns.add('QID', sql.Int)
  tvp.columns.add('DeptID', sql.Int)
  tvp.columns.add('ServID', sql.Int)
  tvp.columns.add('ServCount', sql.Int)
  tvp.columns.add('Notes', sql.NVarChar)

  for (let i = 0; i < det.srvfrm.length; i++) {
    let r = det.srvfrm[i]
    if(r.checked) {
      tvp.rows.add(r.QID, det.dept, r.ServID, r.ServCount, r.Notes) ;
    }
  }

  // CompID int, DeptID INT, BranchID INT, UserID INT, VisitDate Date
  let request = new sql.Request(sqlcon);
  request.input("DeptID", det.dept);
  request.input("BranchID", det.branch);
  request.input("CompID", det.comp);
  request.input("UserID", det.user);
  request.input("VisitDate", det.vDate);
  request.input("QueueDetails", tvp);
  request
    .execute(`IssueTicket`)
    .then(function (ret) {
      let qid = ret[0][0].QID
      firebase
        .database()
        .ref("MainQueue/" + qid)
        .set({
          QID: qid,
          VisitDate: det.vDate,
          DeptID: det.dept,
          UserID: det.user,
          ServiceNo: ret[0][0].ServiceNo,
          UniqueNo: ret[0][0].UniqueNo
        })
      res.json(ret[0][0]);
    })
    .catch(function (err) {
      res.json({
        error: err
      });
      console.log(err);
    })
})
module.exports = router;