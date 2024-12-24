const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = inputElement.value; // Kullanıcının yazdığı komut
        outputElement.innerHTML += `<div>${command}</div>`; // Komutu ekrana yazdır
        inputElement.value = ''; // Inputu temizle

        // Komutu backend'e gönder
        fetch('/log-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: command })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Komut loglandı:', data);
        })
        .catch(error => console.error('Error:', error));
    }
});
