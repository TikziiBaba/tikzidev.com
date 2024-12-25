const output = document.getElementById('output');
const inputField = document.getElementById('input');
const cursor = document.getElementById('cursor');

// Terminal içeriği simüle edilen veriler
const files = {
    "README.md": "Bu, terminal simülatörünün örnek dosyasıdır.",
    "project.js": "console.log('Merhaba dünya!');",
    "index.html": "<!DOCTYPE html><html><head><title>Terminal</title></head><body></body></html>"
};

let currentDirectory = "~"; // Şu anki çalışma dizini

// Kullanıcı yazdığında terminale yazı ekle
inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();
        writeToTerminal(`> ${userInput}`); // Kullanıcı girişini terminale yazdır
        inputField.value = ''; // Yazı kutusunu temizle
        handleCommand(userInput); // Komutu işleme al
        event.preventDefault(); // Enter tuşunun varsayılan işlevini engelle
    }
});

// Terminale yazı eklemek için
function writeToTerminal(inputText) {
    const newLine = document.createElement('div');
    newLine.innerHTML = inputText; // Metni terminale ekle
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight; // Terminali aşağı kaydır
}

// Komutları işleme alma
function handleCommand(command) {
    const args = command.split(" ");
    const baseCommand = args[0];

    switch (baseCommand.toLowerCase()) {
        case "help":
            showHelp();
            break;
        case "clear":
            output.innerHTML = ''; // Ekranı temizle
            break;
        case "ls":
            listFiles();
            break;
        case "pwd":
            writeToTerminal(currentDirectory);
            break;
        case "cat":
            if (args[1]) {
                showFileContent(args[1]);
            } else {
                writeToTerminal("cat: Bir dosya adı belirtmelisiniz.");
            }
            break;
        case "echo":
            const message = args.slice(1).join(" ");
            writeToTerminal(message);
            break;
        default:
            writeToTerminal(`'${command}' komutu tanınmıyor. 'help' yazarak geçerli komutları görebilirsiniz.`);
    }
}

// Yardım menüsü
function showHelp() {
    writeToTerminal("Mevcut Komutlar:");
    writeToTerminal("  help       - Bu yardım menüsünü gösterir.");
    writeToTerminal("  clear      - Terminali temizler.");
    writeToTerminal("  ls         - Mevcut dizindeki dosyaları listeler.");
    writeToTerminal("  pwd        - Bulunduğunuz dizini gösterir.");
    writeToTerminal("  cat <dosya> - Bir dosyanın içeriğini görüntüler.");
    writeToTerminal("  echo <yazı> - Terminalde bir yazı yazdırır.");
}

// Dosyaları listeleme
function listFiles() {
    writeToTerminal("Mevcut dosyalar:");
    Object.keys(files).forEach(file => writeToTerminal(`  ${file}`));
}

// Dosya içeriğini gösterme
function showFileContent(fileName) {
    if (files[fileName]) {
        writeToTerminal(`İçerik (${fileName}):`);
        writeToTerminal(files[fileName]);
    } else {
        writeToTerminal(`cat: '${fileName}' dosyası bulunamadı.`);
    }
}

// Sayfa yüklendiğinde terminali başlat
window.onload = () => {
    writeToTerminal("Hoş geldiniz! 'help' yazarak geçerli komutları görebilirsiniz.");
};
