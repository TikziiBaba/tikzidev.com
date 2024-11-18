// Harf harf yazılacak metin
const initialText = "bekir@tikzi.dev:~$ baslat.sh&"; // Yeni başlangıç yazısı

// İlk animasyon için hedef
const animatedText = document.getElementById("animatedText");

// Matrix animasyonu için hedef
const matrixAnimation = document.getElementById("matrixAnimation");

// İlk animasyon hızı (milisaniye cinsinden)
const typingSpeed = 100;

// Matrix yazıları için parametreler
const numOfColumns = 100;  // Ekranda kaç sütun yazı olsun
const matrixSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';  // Matrix karakterleri

// İlk animasyon işlevi: Yazıyı harf harf ekler
let index = 0;
function typeWriter() {
    if (index < initialText.length) {
        animatedText.textContent += initialText[index]; // Harfi ekle
        index++; // Sonraki harfe geç
        setTimeout(typeWriter, typingSpeed); // Sonraki harfi ekleme zamanı
    } else {
        // Animasyon tamamlandığında bekleyip Matrix animasyonunu başlat
        setTimeout(() => {
            document.getElementById("initialAnimation").style.display = "none"; // İlk animasyonu gizle
            showPressEnterMessage(); // Enter mesajını göster
        }, 1000); // 1 saniye bekle
    }
}

// "Enter'e basın" mesajını göster
function showPressEnterMessage() {
    const pressEnterMessage = document.createElement("div");
    pressEnterMessage.textContent = "Press Enter to continue...";
    pressEnterMessage.classList.add("press-enter-message"); // CSS sınıfı ekle
    document.body.appendChild(pressEnterMessage); // Mesajı ekle

    // Kullanıcı "Enter" tuşuna bastığında devam et
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            pressEnterMessage.style.display = "none"; // Enter mesajını gizle
            startMatrixAnimation(); // Matrix animasyonunu başlat
        }
    });
}

// Matrix animasyonu başlat
function startMatrixAnimation() {
    // Matrix yazılarının her bir sütunu için satır oluştur
    for (let i = 0; i < numOfColumns; i++) {
        createMatrixLine(i);
    }

    // Matrix animasyonunun arka plan resmini görünür yap
    setTimeout(() => {
        matrixAnimation.style.opacity = 1; // Arka plan görünür olsun
    }, 1500); // 1.5 saniye sonra
}

// Matrix sütunu oluşturma ve animasyon
function createMatrixLine(i) {
    const matrixLine = document.createElement("div");
    matrixLine.classList.add("matrix-line"); // CSS sınıfı ekle
    matrixLine.style.left = `${i * 10}px`; // Her sütunun yatay konumunu ayarla

    matrixAnimation.appendChild(matrixLine); // Sütunu Matrix'e ekle

    // Rastgele bir karakter üret
    function generateRandomCharacter() {
        return matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
    }

    // Sütun içeriğini sürekli değiştir
    function animateLine() {
        let lineText = "";
        for (let j = 0; j < 100; j++) {
            lineText += generateRandomCharacter(); // Rastgele karakter ekle
        }
        matrixLine.textContent = lineText; // Sütun içeriğini güncelle
    }

    // Animasyonu başlat
    setInterval(animateLine, 100); // Her 100ms'de bir sütunu güncelle
}

// İlk animasyonu başlat
window.onload = function () {
    typeWriter();
};
