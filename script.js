document.addEventListener('DOMContentLoaded', function() {

    // 1. Particles.js Arka Plan Animasyonu
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80, // Parçacık sayısı
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#9370DB" // Parçacık rengi
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#9370DB", // Bağlantı çizgisi rengi
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6, // Hareket hızı
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse" // Fare üzerine gelince parçacıklar kaçışır
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Tıklayınca yeni parçacık ekler
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // 2. Typewriter (Yazı) Animasyonu
    const typewriterElement = document.querySelector('.typewriter');
    const texts = ["Web Geliştirici.", "UI/UX Meraklısı.", "Freelancer."]; // Burayı kendinize göre değiştirin
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typewriterElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Yazma hızı
        } else {
            setTimeout(erase, 2000); // Kelime yazıldıktan sonra bekleme süresi
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50); // Silme hızı
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Sonraki kelimeye geçmeden önce bekleme
        }
    }
    
    type();

    // 3. Scroll (Kaydırma) Animasyonu
    const sections = document.querySelectorAll('.fade-in-section');

    const options = {
        root: null, // viewport
        threshold: 0.15, // Bölümün %15'i görününce çalış
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animasyon bir kere çalışsın
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

});