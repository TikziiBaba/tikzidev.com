const output = document.getElementById('output');

// Başlangıç yazısı
const initialText = "Merhaba! Ben bir terminalim\nKomutlarımı biliyorsan beni çalıştırabilirsin komutlarımı öğrenmek için instagram > bxkir58";
let index = 0;
let isFirstTerminal = true; // İlk terminal kontrolü

// Terminalde yazı efekti (hızı artırdık)
function typeWriter() {
    if (index < initialText.length) {
        output.innerText += initialText.charAt(index);
        index++;
        setTimeout(typeWriter, 10); // Yazı yazma hızını artırdık (100ms -> 50ms)
    } else {
        createInput(); // Yazı tamamlandığında input alanını yarat
    }
}

// Kullanıcının yazdığı metni terminalde gösterme
function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = event.target.value;
        output.innerText += "\n> " + userInput; // Kullanıcı girişini terminale yazdır
        event.target.value = ''; // Input alanını temizle

        // Komutlara göre işlem yapma
        processCommand(userInput);
    }
}

// Komutları işleyip terminalde gösterme
function processCommand(command) {
    if (command === '/help') {
        output.innerText += "\n/Site yeni geliştirilmekte olan bir yapay zeka sitesidir doğru komutlar kullanıldığı zaman çalışmaktadır \n\nUYARI! \n\nYazılan her komut kayıt altına alınmaktadır";
    } else if (command === '/clear') {
        output.innerText = ""; // Terminali temizle
    } else if (command === '/info') {
        output.innerHTML += "\n\nBu yapay zeka terminali, kullanıcının istediği komutlarla etkileşim kurmasına olanak tanır. Bu sayfayı geliştiren: <a href='https://www.instagram.com/bxkir58/' target='_blank'>Bekir</a>";
        
    } else if (command === '/tikzidev') {
        window.location.href = "https://tikzidev.xyz"; // Belirlediğiniz siteye yönlendirme
    } else if (command === '/new') {
        createNewTerminal(); // Yeni terminali oluştur
    } else {
        output.innerText += "\n\nKomut bulunamadı: " + command; // Tanımadığınız komutları bildirme
    }
}

// Yeni bir terminal oluşturma
function createNewTerminal() {
    // Eski terminali temizle
    output.innerHTML = ''; // Mevcut terminalin içeriğini temizler
    clearInputFields(); // Eski input alanlarını temizler

    // Yeni terminalin başlangıç yazısını ekleyelim
    const newTerminalText = "Yeni bir terminale hoş geldiniz! Komutlarınızı yazabilirsiniz.";
    output.innerHTML = newTerminalText;

    // Yeni terminalde yazı efekti başlatma
    index = 0; // Yazı efekti için sıfırlama
    typeWriter();

    // İlk terminal kontrolünü sıfırlama
    isFirstTerminal = false; // Artık ilk terminal değil
}

// Input alanını temizlemek için fonksiyon
function clearInputFields() {
    const inputContainers = document.querySelectorAll('.input-container');
    inputContainers.forEach(container => container.remove()); // Tüm input alanlarını kaldır
}

// Input alanını dinamik olarak oluşturma
function createInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container'); // Stil ekliyoruz

    const input = document.createElement('input');
    input.id = 'input'; // ID belirleyelim
    input.type = 'text';

    inputContainer.appendChild(input); // Input'u kutuya ekliyoruz
    document.getElementById('terminal').appendChild(inputContainer); // Terminalin içine ekliyoruz
    input.focus(); // Input alanına odaklanalım

    input.addEventListener('keydown', handleInput);
}

// Sayfa yüklendiğinde, ilk terminal yazısını başlat
window.onload = function() {
    if (isFirstTerminal) {
        typeWriter(); // İlk terminalde yazı efekti başlat
    } else {
        createInput(); // Eğer yeni terminal açıldıysa, sadece input başlat
    }

    // Sol tarafa buton ekle
    const newTerminalButton = document.createElement('button');
    newTerminalButton.innerText = 'Yeni Terminal';
    newTerminalButton.id = 'newTerminalButton';
    newTerminalButton.classList.add('terminal-button');
    newTerminalButton.addEventListener('click', createNewTerminal); // Butona tıklandığında yeni terminal başlat

    document.body.appendChild(newTerminalButton); // Butonu sayfaya ekle
};
