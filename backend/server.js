const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Statik dosyaları sunmak için
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Mesaj gönderildiğinde tüm kullanıcılara ilet
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Bağlantı kesildiğinde
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Sunucuyu başlat
server.listen(3000, () => {
  console.log('listening on *:3000');
});
