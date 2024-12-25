// HTML'ye terminal elemanlarını ekle
const body = document.body;

// Terminal kutusu
const terminalContainer = document.createElement('div');
terminalContainer.classList.add('terminal-container');
body.appendChild(terminalContainer);

// Terminal çıktı alanı
const terminalOutput = document.createElement('div');
terminalOutput.classList.add('terminal-output');
terminalContainer.appendChild(terminalOutput);

// Terminal giriş alanı
const inputLine = document.createElement('div');
inputLine.classList.add('input-line');
terminalContainer.appendChild(inputLine);

// Prompt
const prompt = document.createElement('span');
prompt.classList.add('prompt');
prompt.textContent = '>';
inputLine.appendChild(prompt);

// Giriş kutusu
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.id = 'input';
inputLine.appendChild(inputField);

// Giriş işlemleri
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();
        if (userInput) {
            // Kullanıcı girişini terminale yazdır
            writeToTerminal(`> ${userInput}`);
            handleCommand(userInput);
        }
        inputField.value = ''; // Giriş alanını temizle
    }
});

// Terminale yazı ekleme
function writeToTerminal(text) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    terminalOutput.appendChild(newLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Otomatik kaydırma
}

// Komut işleme
function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            writeToTerminal('Komutlar: help, clear, ls');
            break;
        case 'clear':
            terminalOutput.innerHTML = ''; // Terminali temizle
            break;
        case 'ls':
            writeToTerminal('index.html\nstyle.css\nscript.js');
            break;
        default:
            writeToTerminal(`'${command}' tanınmıyor.`);
    }
}
