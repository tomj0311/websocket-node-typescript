import * as express from 'express';
import * as http from 'http';
import * as webSocket from 'ws';

import * as models from './dataModel';
import { json } from 'body-parser';
import { clearInterval } from 'timers';

export interface ResponseData {
	DateTime: Date;
	Randomized: number;
}

const app = express();

const server = http.createServer(app);

const wss = new webSocket.Server({ server});

wss.on('connection', (ws: webSocket) => {
    var interval = setInterval(function() {
        //
    }, 1000);

    ws.on('message', (message: string) => {
        
        clearInterval(interval);

        let datamodel: models.DataModel = new models.DataModel(message);

        let fdate = new Date(datamodel.FromDate);
        let tdate = new Date(datamodel.ToDate);

        interval = setInterval(function() {
            fdate  =  new Date(fdate.setSeconds(fdate.getSeconds() + 1));
            if (fdate >= tdate){
                clearInterval(interval);
            }
            var randomnumber =  Math.floor(Math.random() * datamodel.Randomize) + 1;
            sendData(JSON.stringify({DateTime: fdate.toString(), Randomized: randomnumber }));
        }, 1000);
	});
});

function sendData(data: string) {
    wss.clients.forEach(client => {
        client.send(data);
    });	
}

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
