var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5001,()=>{
  console.log("RODANDO NA PORTA 5001")
});

io.on('connection', function (socket) {
  
  socket.on('text',data=>{
      io.emit('update',data)
  })

  socket.on('button', data=>{
    io.emit('updateBtn', data)
  })
  
});

