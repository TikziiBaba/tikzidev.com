let currentImageIndex = 0;
const images = [
    "images/image1.png",
    "images/image2.png",
    "images/image3.png",
    "images/image4.png",
    "images/image5.png",  // Virgül eklenmeli
    "images/image6.png"
];

// Işıklı kutuyu açma fonksiyonu
function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = images[currentImageIndex];

    // Tarayıcının yüklediğinden emin olmak için konsola yazdır
    console.log("Açılan resim yolu:", images[currentImageIndex]);
}

// Işıklı kutuyu kapama fonksiyonu
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Resmi değiştirme fonksiyonu (önceki / sonraki)
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    document.getElementById("lightbox-img").src = images[currentImageIndex];
}

// 🔹 Resmi İndirme Fonksiyonu (Daha Güvenli)
function downloadImage() {
    const imageUrl = images[currentImageIndex];

    // İndirme işlemini fetch ile yapmak
    fetch(imageUrl)
        .then(response => {
            // Eğer yanıt başarısızsa (404 gibi), hata fırlat
            if (!response.ok) {
                throw new Error(`Resim yüklenemedi! Durum kodu: ${response.status}`);
            }
            return response.blob();  // Resmi blob olarak al
        })
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `bekirs-gallery-${currentImageIndex + 1}.jpg`;  // İndirme ismi, her resme özel
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);  // Linki DOM'dan kaldır
        })
        .catch(error => {
            console.error("İndirme hatası:", error);
            alert(`İndirme sırasında bir hata oluştu: ${error.message}`);  // Hata mesajı
        });
}


// 🔹 Resmi Paylaşma Fonksiyonu
function shareImage() {
    if (navigator.share) {
        navigator.share({
            title: "Bekir's Gallery",
            text: "Bu harika resmi incele!",
            url: window.location.origin + "/" + images[currentImageIndex]  // Resmi paylaşma
        }).catch(err => console.log("Paylaşım başarısız: ", err));
    } else {
        alert("Tarayıcınız paylaşımı desteklemiyor.");
    }
}
