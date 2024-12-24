const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// JSON verisini alabilmek için body-parser kullan
app.use(bodyParser.json());

// Komutları log dosyasına kaydet
app.post('/log-command', (req, res) => {
    const { command } = req.body;

    // Log dosyasına komut ekleyin
    const logMessage = `Komut: ${command} | Tarih: ${new Date().toISOString()}\n`;

    fs.appendFile('commands.log', logMessage, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Komut loglanamadı' });
        }
        // Komut başarıyla kaydedildiyse, logu git'e ekleyin
        commitAndPushLog();
        res.status(200).json({ message: 'Komut başarıyla loglandı' });
    });
});

// Git komutlarını çalıştırarak log dosyasını push edin
function commitAndPushLog() {
    exec('git add commands.log && git commit -m "Yeni komut loglandı" && git push origin main', (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
