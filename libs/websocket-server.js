/**
 * Websocket Server
 */

const Config = require('./config');
const BoardConnecter = require('./board-connector');
const http = require('http');
const WebSocketServer = require('websocket').server; // npm i websocket --save


//!! HTP Server
const httpServer = http.createServer();
httpServer.listen(Config.ServerPort, () => {
    console.log('HTTP/WebSockets listening on port ' + httpServer.address().port);
});


//!! WebSocket Server
const wsServer = new WebSocketServer({
    httpServer: httpServer
});


//!! On Request
wsServer.on('request', request => {
    //!! Connection
    const connection = request.accept(null, request.origin);

    //!! On Message
    connection.on('message', message => {
        const data = message.utf8Data;
        console.log(`Wss data: ${data}`);
        BoardConnecter.process_request(data, (json) => {
            connection.send(JSON.stringify(json))
        });
    });

    //!! On Close
    connection.on('close', (reasonCode, description) => {
        //!!console.log(`Wss closed: ${reasonCode} - ${description}`)
    });

    //console.log(wsServer.connections.length);
});
