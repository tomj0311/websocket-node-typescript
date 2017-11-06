import * as express from 'express';
import * as http from 'http';
import * as webSocket from 'ws';

import * as models from './dataModel';

export interface ResponseData {
	DateTime: Date;
	Randomized: number;
}

const app = express();

const server = http.createServer(app);

const wss = new webSocket.Server({ server});

wss.on('connection', (ws: webSocket) => {

    ws.on('message', (message: string) => {
		try {
            let userMessage: models.RequestMessage = new models.RequestMessage(message);
            
            let resdata: ResponseData[] = [];
            
            let fromdate = new Date(userMessage.FromDate);
            let todate = new Date(userMessage.ToDate);
    
            while(fromdate < todate){
                var randomnumber =  Math.floor(Math.random() * userMessage.Randomize) + 1
                resdata.push({DateTime: fromdate, Randomized: randomnumber});
                 
                fromdate =  new Date(fromdate.setSeconds(fromdate.getSeconds() + 1));
            }

            let response = JSON.stringify(resdata);
            ws.send(response);

		} catch (e) {
			console.error(e.message);
		}
	});
    ws.send('Socket Ready');
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
