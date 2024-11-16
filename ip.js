const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Static dosyaları sun
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    fs.appendFile('ips.txt', `${ip}\n`, err => {
        if (err) throw err;
        console.log(`IP Kaydedildi: ${ip}`);
    });
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor...');
});
