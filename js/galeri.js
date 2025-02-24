let currentImageIndex = 0;
const images = [
    "images/image1.png",
    "images/image2.png",
    "images/image3.png",
    "images/image4.png",
    "images/image5.png",
    "images/image6.png",
    "images/image7.png",
    "images/image8.png",
    "images/image9.png",
    "images/image10.png",
    "images/image11.png",
    "images/image12.png",
    "images/image13.png",
    "images/image14.png",
    "images/image15.png",
    "images/image16.png",
    "images/image17.png",
    "images/image18.png",
    "images/image19.png",
    "images/image20.png",
    "images/image21.png",
    "images/image22.png",
    "images/image23.png",
    "images/image24.png",
    "images/image25.png",
    "images/image26.png",
    "images/image27.png",
    "images/image28.png",
    "images/image29.png",
    "images/image30.png",
    "images/image31.png"
];

// Işıklı kutuyu açma fonksiyonu
function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = images[currentImageIndex];

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

// 🔹 Resmi İndirme Fonksiyonu
function downloadImage() {
    const imageUrl = images[currentImageIndex];

    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Resim yüklenemedi! Durum kodu: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `bekirs-gallery-${currentImageIndex + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error("İndirme hatası:", error);
            alert(`İndirme sırasında bir hata oluştu: ${error.message}`);
        });
}

// 🔹 Resmi Paylaşma Fonksiyonu
function shareImage() {
    if (navigator.share) {
        navigator.share({
            title: "Bekir's Gallery",
            text: "Bu harika resmi incele!",
            url: window.location.origin + "/" + images[currentImageIndex]
        }).catch(err => console.log("Paylaşım başarısız: ", err));
    } else {
        alert("Tarayıcınız paylaşımı desteklemiyor.");
    }
}
