/* 
fluent-ffmpeg

Must have those files  ffmpeg.exe , ffprobe.exe  and then set their path as below 
point to your deisred path , for other OS , check NPM website 

ffmpeg.setFfmpegPath(path.join(__dirname, '../bin/ffmpeg.exe'));
ffmpeg.setFfprobePath(path.join(__dirname, '../bin/ffprobe.exe'));
*/

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var ffprobe = require('ffprobe')
var ffmpeg = require('fluent-ffmpeg');
var path = require('path')

ffmpeg.setFfmpegPath(path.join(__dirname, '../bin/ffmpeg.exe'));
ffmpeg.setFfprobePath(path.join(__dirname, '../bin/ffprobe.exe'));

var filePath = path.join(__dirname, '../audio/');
var fs = require('fs');
var audFiles = [],
    soundNames = []
var stream, currentFile;


router.post("/audio", function (req, res, next) {

    var command = new ffmpeg();

    soundNames = playQAud(req.body);
    soundNames.forEach(function (soundName) {
        command = command.addInput(filePath + soundName);
    });

    command.mergeToFile(filePath + 'all.mp3')
        .on('error', function (err) {
            console.log('Error ' + err.message);
        })
        .on('end', function () {
            var stat = fs.statSync(filePath + 'all.mp3');
            res.header("Access-Control-Allow-Origin", "*");
            res.writeHead(200, {
                "Conten-Type": "audio/mpeg",
                "Content-Length": stat.size
            });
            fs.createReadStream(filePath + 'all.mp3')
                .pipe(res)
                .on('finish', () => {
                    res.end();
                })
        })
});

function playQAud(tickets) {
    let qNum = 0;
    let paths = [];

    for (let i = 0; i < tickets.length; i++) {
        qNum = parseInt(tickets[i]['ServiceNo'].substr(0, 4));
        paths.push('CustomerNo.mp3');
        if (qNum < 20) {
            paths.push(qNum + '.mp3');
        } else if (qNum > 20 && qNum < 100) {
            if (qNum.toString().substr(1, 1) == '0')
                paths.push(qNum + '.mp3');
            else {
                paths.push(qNum.toString().substr(1, 1) + '.mp3');
                paths.push('and.mp3');
                paths.push(qNum.toString().substr(0, 1) + '0' + '.mp3');
            }
        }
        paths.push('Window.mp3')
        paths.push(tickets[i]['ProvWindow']+'.mp3')
    }
    return paths;
}
module.exports = router;