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
    }
});

// Terminale yazı ekleme
function writeToTerminal(text) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight; // Otomatik kaydırma
}

// Örnek komutlar
function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            writeToTerminal('Mevcut Komutlar: help, clear, ls');
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        case 'ls':
            writeToTerminal('index.html\nstyle.css\nscript.js');
            break;
        default:
            writeToTerminal(`'${command}' komutu tanınmıyor.`);
    }
}
