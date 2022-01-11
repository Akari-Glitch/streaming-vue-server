const express = require('express');
var fs = require('fs');
var https = require('https');
const { Server } = require('socket.io');

const app = express();
const server = https.createServer({
   cert: fs.readFileSync('MyCertificate.crt'),
   key: fs.readFileSync('MyKey.key')
 }, app);
const io = new Server(server, {
    cors: {
        origin: "",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('usuario conectado');
    socket.on('stream', (image) =>{
        socket.broadcast.emit('stream', image); 
    })
})

server.listen(3000, () => {
    console.log('Streaming server is running on 3000')
})