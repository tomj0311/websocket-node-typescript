"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const webSocket = require("ws");
const models = require("./dataModel");
const timers_1 = require("timers");
const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });
wss.on('connection', (ws) => {
    var interval = setInterval(function () {
        //
    }, 1000);
    ws.on('message', (message) => {
        timers_1.clearInterval(interval);
        let datamodel = new models.DataModel(message);
        let fdate = new Date(datamodel.FromDate);
        let tdate = new Date(datamodel.ToDate);
        interval = setInterval(function () {
            fdate = new Date(fdate.setSeconds(fdate.getSeconds() + 1));
            if (fdate >= tdate) {
                timers_1.clearInterval(interval);
            }
            var randomnumber = Math.floor(Math.random() * datamodel.Randomize) + 1;
            sendData(JSON.stringify({ DateTime: fdate.toString(), Randomized: randomnumber }));
        }, 1000);
    });
});
function sendData(data) {
    wss.clients.forEach(client => {
        client.send(data);
    });
}
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map