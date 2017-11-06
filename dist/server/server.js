"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const webSocket = require("ws");
const models = require("./dataModel");
const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        try {
            let userMessage = new models.RequestMessage(message);
            let resdata = [];
            let fromdate = new Date(userMessage.FromDate);
            let todate = new Date(userMessage.ToDate);
            while (fromdate < todate) {
                var randomnumber = Math.floor(Math.random() * userMessage.Randomize) + 1;
                resdata.push({ DateTime: fromdate, Randomized: randomnumber });
                fromdate = new Date(fromdate.setSeconds(fromdate.getSeconds() + 1));
            }
            let response = JSON.stringify(resdata);
            ws.send(response);
        }
        catch (e) {
            console.error(e.message);
        }
    });
    ws.send('Socket Ready');
});
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map