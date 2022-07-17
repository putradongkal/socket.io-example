const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on('server_notification', (data) => {
        console.log('Notifikasi diterima, data: ' + data);
        
        /* KIRIM NOTIFIKASI KLIEN */
        io.emit('client_notification', data)
    });
});

httpServer.listen(3000, function(){
    console.log('Connected');
});