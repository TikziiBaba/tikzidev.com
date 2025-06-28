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

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------
    // TEMA DEĞİŞTİRİCİ (DARK/LIGHT MODE)
    // ------------------------------------
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        // Sayfa yüklendiğinde kayıtlı temayı uygula
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }

        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // ------------------------------------
    // ÇOKLU DİL DESTEĞİ
    // ------------------------------------
    const languageSwitcher = document.querySelector('.language-switcher');
    let translations = {};

    async function loadTranslations() {
        try {
            const response = await fetch('translations.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            translations = await response.json();
            const savedLang = localStorage.getItem('language') || 'tr';
            setLanguage(savedLang);
        } catch (error) {
            console.error('Çeviri dosyası yüklenemedi veya okunamadı:', error);
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;

        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key] !== undefined) {
                elem.innerHTML = translations[lang][key];
            }
        });

        document.title = translations[lang]['title'] || document.title;
        
        // Typewriter metinlerini güncelle
        const typewriterContainer = document.querySelector('.description[data-texts-key]');
        if (typewriterContainer) {
             const textsKey = typewriterContainer.getAttribute('data-texts-key');
             const newTexts = translations[lang][textsKey];
             if (newTexts) {
                typewriterContainer.dataset.texts = newTexts;
                // Typewriter'ı yeni metinle yeniden başlat
                restartTypewriter(newTexts.split('|'));
             }
        }

        if (languageSwitcher) {
            const currentActive = languageSwitcher.querySelector('button.active');
            if(currentActive) currentActive.classList.remove('active');
            
            const newActive = languageSwitcher.querySelector(`[data-lang="${lang}"]`);
            if(newActive) newActive.classList.add('active');
        }
        localStorage.setItem('language', lang);
    }

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                setLanguage(e.target.dataset.lang);
            }
        });
    }
    
    loadTranslations();

    // ------------------------------------
    // TYPEWRITER ANİMASYONU
    // ------------------------------------
    const typewriterSpan = document.querySelector('.typewriter');
    let typeInterval, eraseInterval;
    
    function restartTypewriter(textsArray) {
        if (!typewriterSpan) return;
        // Mevcut animasyonları durdur
        clearInterval(typeInterval);
        clearInterval(eraseInterval);
        typewriterSpan.textContent = '';

        let textIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textsArray[textIndex].length) {
                typewriterSpan.textContent += textsArray[textIndex].charAt(charIndex);
                charIndex++;
                typeInterval = setTimeout(type, 100);
            } else {
                eraseInterval = setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typewriterSpan.textContent = textsArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                eraseInterval = setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % textsArray.length;
                typeInterval = setTimeout(type, 500);
            }
        }
        type();
    }


    // ------------------------------------
    // DİĞER SCRIPTLER
    // ------------------------------------
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#9370db"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#9370db","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"repulse":{"distance":100,"duration":0.4},"push":{"particles_nb":4}}},"retina_detect":true});
    }

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => { observer.observe(section); });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});
