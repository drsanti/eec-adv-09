var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = 3005;

app.use( express.static('public') );

server.listen(PORT, function(){
    console.log('Server is listening on *:' + PORT);
});
 

//!! Connection array
let connections = [];


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/operator', function(req, res){
    res.sendFile(__dirname + '/operator.html');
});
app.get('/engineer', function(req, res){
    res.sendFile(__dirname + '/engineer.html');
});



//!! Client connected
io.on('connection', function( socket ){

    console.log(socket.id + ' connected');

    //!! Add new connection
    addConnection( socket );
    
    //!! On-disconnected
    socket.on("disconnect", ( ) => {
        console.log(socket.id + ' disconnected'); 
        //!! Remove the connection
        removeConnection( socket );
    });

    //!!
    socket.on("operator", (d) =>{
        console.log("on-operator: " + d);
        publish(socket, d);
    });
    socket.on("engineer", (d) =>{
        console.log("on-engineer: " + d);
        publish(socket, d);
    });
    socket.on("robot", (d) =>{
        console.log("on-robot: " + d);
        publish(socket, d);
    });
});

function publish(socket, data) {
    for( let i=0; i<connections.length; i++ ) {
        if( socket !== connections[i] ) {
            connections[i].emit( "data", data );   
        }
    }
}

function addConnection( socket ) {
    connections.push( socket );
    debug();
}

function removeConnection( socket ) {
    let idx = -1;
    for( let i=0; i<connections.length; i++ ) {
        if(connections[i] === socket) {
            idx = i;
            break;
        }
    }
    connections.splice(idx, 1);
    debug();
}

function debug() {
    for( let i=0; i<connections.length; i++ ) {
       console.log("  ** " + connections[i].id + " **" );
    }  
}



