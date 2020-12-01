fs = require("fs");
demofile = require("demofile");

function predict(playerName, demoFile) {

    //  fs.truncateSync("./Output/predict.csv");



    return new Promise(resolve => {
        fs.readFile("./DemoFiles/" + demoFile, (err, buffer) => {
            const demoFileLib = new demofile.DemoFile();
            myID = -1;
            demoFileLib.stringTables.on("update", e => {
                if (e.table.name === "userinfo" && e.userData != null) {
                    if (e.userData.name === playerName) {
                        myID = e.userData.userId;
                    }
                }
            });
            demoFileLib.gameEvents.on("player_death", e => {
                if (myID != -1 && e.attacker == myID) {
                    try {
                        const attacker = demoFileLib.entities.getByUserId(e.attacker);
                        const attackerName = attacker ? attacker.name : "unnamed";
                        const victim = demoFileLib.entities.getByUserId(e.userid);
                        const victimName = victim ? victim.name : "unnamed";

                        data = attackerName + "," + attacker.teamNumber + "," + attacker.kills + "," + attacker.deaths + "," + attacker.position.x + "," + attacker.position.y + "," + attacker.position.z + "," + attacker.flashDuration + "," + attacker.isAlive + "," + attacker.isScoped + "," + attacker.speed + "," + attacker.isFakePlayer + "," + attacker.eyeAngles.pitch + "," + attacker.eyeAngles.yaw + "," + (attacker.isDucked ? "1" : "0") + "," + victimName + "," + victim.teamNumber + "," + victim.kills + "," + victim.deaths + "," + victim.position.x + "," + victim.position.y + "," + victim.position.z + "," + victim.flashDuration + "," + victim.isAlive + "," + victim.isScoped + "," + victim.speed + "," + victim.isFakePlayer + "," + victim.eyeAngles.pitch + "," + victim.eyeAngles.yaw + "," + (victim.isDucked ? "1" : "0") + "," + e.penetrated + "," + (e.headshot ? "1" : "0") + "," + (e.noscope ? "1" : "0") + "," + (isHacker ? "1" : "0") + "\n";

                        fs.appendFile("./Output/predict.csv", data, (err) => {
                            if (err) console.log(err);
                            else console.log(data + "Successfully Written to File.\n");
                        });
                    } catch (exp) {
                    }
                }
            });
            demoFileLib.parse(buffer);
            //call python script of ML code
            console.log(`predict.js`);
            const request = require('request');
            request('http://localhost:8081/', { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                resolve(body);
                console.log(body);
                console.log(body.url);
                console.log(body.explanation);
            });
        });
    });

}


module.exports = predict