let currentIndex = 0;
const images = document.querySelectorAll('.galleryImage');
const totalImages = images.length;

// Resimleri değiştirme fonksiyonu
function changeImage(index) {
    // Resimleri geçici olarak gizle
    images.forEach(image => {
        image.classList.remove('active');
    });

    // Yeni resmi aktif yap
    images[index].classList.add('active');
}

// Başlangıçta ilk resmi göster
changeImage(currentIndex);

// Sağ ve sol kaydırma için touch olayları
let touchStartX = 0;

document.getElementById('galeri').addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX; // Başlangıç noktasını kaydet
});

document.getElementById('galeri').addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].screenX; // Bitiş noktasını kaydet
    const touchDifference = touchStartX - touchEndX; // Farkı hesapla

    if (touchDifference > 50) {
        // Sola kaydırma
        currentIndex = (currentIndex + 1) % totalImages;
    } else if (touchDifference < -50) {
        // Sağa kaydırma
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    }

    changeImage(currentIndex);
});

// Ok tuşlarıyla resim değiştirme (masaüstü için)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        // Sağ ok tuşu
        currentIndex = (currentIndex + 1) % totalImages;
        changeImage(currentIndex);
    } else if (event.key === 'ArrowLeft') {
        // Sol ok tuşu
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        changeImage(currentIndex);
    }
});

// Kumanda butonlarına işlevsellik ekleme
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');

let intervalID = null; // Resimlerin otomatik geçişini kontrol etmek için

// Önceki buton
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    changeImage(currentIndex);
});

// Sonraki buton
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    changeImage(currentIndex);
});

// Oynatma butonu
playButton.addEventListener('click', () => {
    if (intervalID === null) {
        intervalID = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            changeImage(currentIndex);
        }, 2000); // 2 saniyede bir resim değişsin
    }
});

// Duraklatma butonu
pauseButton.addEventListener('click', () => {
    clearInterval(intervalID);
    intervalID = null;
});
