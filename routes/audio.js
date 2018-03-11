var express = require("express");
var router = express.Router();
var sql = require("mssql");
var jwt = require("jsonwebtoken");

var fs = require('fs');
var filePath = '../../web/eQueue/audio/';
var stat = fs.statSync(filePath);



router.get("/audio/:id", function (req, res, next) {
    
    filePath = filePath + req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    
    res.writeHead(200,{
        "Conten-Type": "audio/wav",
        "Content-Length": stat.size
    });

    fs.createReadStream(filePath).pipe(res);
    filePath = '../../web/eQueue/audio/';
});

module.exports = router;