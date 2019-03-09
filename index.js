var express = require('express');
var socket = require('socket.io');



// Setup de app
var app = express();
var server = app.listen(4000,function(){
  console.log('escuchando peticiones en el puerto 4000')
});

// Archivos estaticos
app.use(express.static('public'));

// Socket Setup
var io = socket(server);
io.on('connection',(socket)=>{

    console.log('conexion socket exitosa', socket.id);

    // Evento de chat
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Evento de escritura
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
