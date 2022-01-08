const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('stream', {image} =>{
        socket.broadcast.emit('stream', image); 
    })
})

server.listen(3000, () => {
    console.log('Streaming server is running on 3000')
})