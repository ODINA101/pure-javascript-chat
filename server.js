
'use strict';
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app).listen(3000);
const io = require('socket.io')(server);


app.use(express.static(__dirname + '/client'));

var servers = [];



 


io.sockets.on('connection',(socket)=>{
	io.emit("servers",servers);
	

	console.log('user has connected');

	socket.on('newroom',(data)=>{
    servers.push(data);
	io.emit("servers",servers);
        

	});

	socket.on('joined',(data)=>{
		socket.join(data);
		console.log("joined to " + data);
	});
         

    socket.on('msg',(data)=>{
    	 io.sockets.in(data.server).emit('chat_msg',{msg:data.msg,name:data.my_name});
    });
 

});
     