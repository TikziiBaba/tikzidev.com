// Harf harf yazılacak metin
const initialText = "bekir@tikzi.dev:~$ "; // Yeni başlangıç yazısı

// İlk animasyon için hedef
const animatedText = document.getElementById("animatedText");

// Matrix animasyonu için hedef
const matrixAnimation = document.getElementById("matrixAnimation");

// İlk animasyon hızı
const typingSpeed = 100;

// Matrix yazıları için parametreler
const numOfColumns = 100;  // Ekranda kaç kolon yazı olsun
const matrixSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';  // Matrix karakterleri

// İlk animasyon işlevi
let index = 0;
function typeWriter() {
    if (index < initialText.length) {
        animatedText.textContent += initialText[index];
        index++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Animasyon tamamlandığında temizle ve Matrix animasyonunu başlat
        setTimeout(() => {
            document.getElementById("initialAnimation").style.display = "none";
            startMatrixAnimation();
        }, 1000); // 1 saniye bekle
    }
}

// Matrix animasyonu başlat
function startMatrixAnimation() {
    // Matrix yazılarının her bir satırını başlat
    for (let i = 0; i < numOfColumns; i++) {
        createMatrixLine(i);
    }

    // Matrix animasyonunun arka plan resmini görünür yap
    setTimeout(() => {
        matrixAnimation.style.opacity = 1; // Resmin görünmesini sağla
    }, 1500); // 1.5 saniye sonra
}

// Matrix çizgisi oluşturma
function createMatrixLine(i) {
    const matrixLine = document.createElement("div");
    matrixLine.classList.add("matrix-line");
    matrixLine.style.left = `${(i * 10)}px`; // Her satırın sola kaymasını sağla

    matrixAnimation.appendChild(matrixLine);

    // Yazıyı her zaman rasgele bir karakterle yazdır
    function generateRandomCharacter() {
        return matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
    }

    function animateLine() {
        let lineText = "";
        for (let j = 0; j < 100; j++) {
            lineText += generateRandomCharacter();
        }
        matrixLine.textContent = lineText;
    }

    // Animasyon başlat
    setInterval(animateLine, 100); // Her 100ms'de bir rastgele yazı ekle
}

// İlk animasyonu başlat
window.onload = function() {
    typeWriter();
};
