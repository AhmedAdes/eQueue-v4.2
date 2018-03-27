let cron = require('node-cron')
var sql = require("mssql");
var sqlcon = sql.globalPool;

var firebase = require("firebase");
var database = firebase.database();
let scd = cron.schedule('0 0,12 * * *', function () {
    var request = new sql.Request(sqlcon);
    request
        .execute(`EndDay`)
        .then(function (ret) {
            let Q = firebase.database().ref("MainQueue")
            Q.on('value', function (Qsnapshot) {
                Qsnapshot.forEach(function (Bsnap) {
                    // console.log(Bsnap.val())
                    if (Bsnap.hasChildren()) {
                        Bsnap.forEach(function (Qsnap) {
                            if (Qsnap.hasChildren()) {
                                let QData = Qsnap.val()
                                let D1 = new Date()
                                let D2 = new Date(QData.VisitDate)
                                D1.setHours(0,0,0,0)
                                D2.setHours(0,0,0,0)
                                // console.log(`${Bsnap.key} / ${Qsnap.key}: ${D2} : ${D2 < D1}`)
                                if (D2 < D1) {
                                    console.log(Bsnap.key + '/' + Qsnap.key)
                                    firebase.database().ref("MainQueue/" + Bsnap.key + "/" + Qsnap.key).remove()
                                }
                            }
                        })
                    }
                })
            })
            console.log('running purge queue task every twelve hours');
        })
        .catch(function (err) {
            if (err) {
                console.log('the purge queue task failed for the following cause:');
                console.log(err);
            }
        });
}, false)

module.exports = {
    scdul: scd
}