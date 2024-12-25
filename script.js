const inputField = document.getElementById('input');
const outputDiv = document.getElementById('output');

let commandHistory = [];

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const userInput = inputField.value.trim();
        if (userInput) {
            addToOutput(`> ${userInput}`);
            processCommand(userInput);
        }
        inputField.value = '';
    }
});

function addToOutput(text) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;  // Scroll to the bottom
}

function processCommand(command) {
    // Simulate command output
    if (command.toLowerCase() === "hello") {
        addToOutput("Merhaba! Terminal'e hoş geldiniz.");
    } else if (command.toLowerCase() === "clear") {
        outputDiv.innerHTML = '';
    } else {
        addToOutput(`Komut bulunamadı: ${command}`);
    }
}
