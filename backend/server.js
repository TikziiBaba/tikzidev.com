const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Ana sayfaya basit bir HTML dosyası göndermek
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket bağlantıları
io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı.');

    // Mesajları dinleme ve yayınlama
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Mesajı herkese gönder
    });

    // Kullanıcı ayrıldığında
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı.');
    });
});

// Sunucuyu başlatma
server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor.');
});
