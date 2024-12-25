const output = document.getElementById('output');
const inputField = document.getElementById('input');

// Komut işleyici
inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim(); // Kullanıcı girişini al
        if (userInput) {
            writeToTerminal(`> ${userInput}`); // Kullanıcı girişini terminale yazdır
            handleCommand(userInput); // Komutu işle
        }
        inputField.value = ''; // Giriş alanını temizle
        event.preventDefault(); // Enter tuşunun varsayılan davranışını engelle
    }
});

// Terminale yazı ekleme
function writeToTerminal(text) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight; // Otomatik olarak en sona kaydır
}

// Komutları işleme
function handleCommand(command) {
    const args = command.split(' ');
    const baseCommand = args[0].toLowerCase();

    switch (baseCommand) {
        case 'help':
            showHelp();
            break;
        case 'clear':
            output.innerHTML = ''; // Terminali temizle
            break;
        case 'ls':
            listFiles();
            break;
        case 'pwd':
            writeToTerminal('/home/user'); // Örnek çalışma dizini
            break;
        case 'cat':
            if (args[1]) {
                showFileContent(args[1]);
            } else {
                writeToTerminal('cat: Dosya adı belirtmelisiniz.');
            }
            break;
        default:
            writeToTerminal(`'${command}' komutu tanınmıyor. 'help' yazarak yardım alabilirsiniz.`);
    }
}

// Yardım menüsü
function showHelp() {
    writeToTerminal('Mevcut Komutlar:');
    writeToTerminal('  help       - Yardım menüsünü gösterir.');
    writeToTerminal('  clear      - Terminali temizler.');
    writeToTerminal('  ls         - Dosyaları listeler.');
    writeToTerminal('  pwd        - Geçerli dizini gösterir.');
    writeToTerminal('  cat <dosya> - Dosya içeriğini görüntüler.');
}

// Dosya listesi
function listFiles() {
    writeToTerminal('Dosyalar:');
    writeToTerminal('  README.md');
    writeToTerminal('  index.html');
    writeToTerminal('  script.js');
}

// Örnek dosya içerikleri
function showFileContent(fileName) {
    const files = {
        'README.md': 'Bu, örnek bir README dosyasıdır.',
        'index.html': '<!DOCTYPE html><html><head><title>Terminal</title></head><body></body></html>',
        'script.js': 'console.log("Merhaba, dünya!");'
    };

    if (files[fileName]) {
        writeToTerminal(`İçerik (${fileName}):`);
        writeToTerminal(files[fileName]);
    } else {
        writeToTerminal(`cat: '${fileName}' dosyası bulunamadı.`);
    }
}

// Sayfa yüklendiğinde hoş geldin mesajı
window.onload = () => {
    writeToTerminal('Web Terminaline hoş geldiniz!');
    writeToTerminal('Bir komut girin veya "help" yazarak yardım alabilirsiniz.');
};
