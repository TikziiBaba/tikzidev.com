const commands = {
    help: () => {
      return `Mevcut komutlar:
  - help: Yardım menüsünü gösterir
  - clear: Terminali temizler
  - color <renk>: Terminal yazı rengini değiştirir
  - color info: Mevcut renkleri gösterir
  - /new: Yeni bir terminal başlatır
  - joke: Rastgele bir şaka gösterir
  - random: Rastgele bir sayı üretir
  - date: Bugünün tarihini gösterir
  - ascii: ASCII sanat resmi gösterir
  - reverse <metin>: Verilen metni tersine çevir
  - art <isim>: Havalı bir şekilde ismi yazdırır
  - inspire: İlham verici bir söz gösterir
  - fact: İlginç bir bilgi gösterir`;
    },
  
    clear: () => {
      return "clear"; // Bu komut terminali temizler
    },
  
    color: (args) => {
      const validColors = ["red", "green", "blue", "yellow", "cyan", "magenta", "black", "white"];
      if (validColors.includes(args)) {
        document.documentElement.style.setProperty('--terminal-text-color', args);
        document.documentElement.style.setProperty('--terminal-background', getBackgroundColor(args));
        document.documentElement.style.setProperty('--terminal-border-color', getBorderColor(args));
        document.documentElement.style.setProperty('--terminal-shadow-color', getShadowColor(args));
        document.documentElement.style.setProperty('--terminal-prompt-color', getPromptColor(args));
        return `Yazı rengi '${args}' olarak değiştirildi.`;
      } else {
        return "Geçersiz renk! Geçerli renkler: red, green, blue, yellow, cyan, magenta, black, white.";
      }
    },
  
    colorInfo: () => {
      return `Mevcut renkler:
  - red
  - green
  - blue
  - yellow
  - cyan
  - magenta
  - black
  - white`;
    },
  
    new: () => {
      return "Yeni terminal başlatılıyor...";
    },
  
    joke: () => {
      const jokes = [
        "Neden bilgisayarlar hiç şaka yapmaz? Çünkü komik kodları yok!",
        "Bir programcı neden bilgisayarını hiç temizlemez? Çünkü her şey düzenli ve 'debug'lıdır!",
        "Bir web geliştiricisi neden dağa tırmanmış? Çünkü 'cache'yi temizlemek istemiş!",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
  
    random: () => {
      return `Rastgele sayı: ${Math.floor(Math.random() * 100)}`;
    },
  
    date: () => {
      const date = new Date();
      return `Bugünün tarihi: ${date.toLocaleDateString()}`;
    },
  
    ascii: () => {
      return `
        ███████████
       █████████████
      ████▒▒▒▒▒▒████
       █████████████
        ███████████
      `;
    },
  
    reverse: (text) => {
      return text.split('').reverse().join('');
    },
  
    art: (args) => {
      if (!args) {
        return "Lütfen bir isim girin! Kullanım: art <isim>";
      }
  
      const artText = generateStyledText(args);
      return artText;
    },
  
    inspire: () => {
      const quotes = [
        "Başarı, harekete geçmeye cesaret etmekle başlar.",
        "Hayatta her şey mümkündür.",
        "Düşleriniz peşinden gitmek için hiçbir zaman geç değildir.",
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
  
    fact: () => {
      const facts = [
        "Yıldızlar, genellikle milyarlarca yıl yaşar.",
        "Yavaşça büyüyen ağaçlar, daha uzun ömürlüdür.",
        "Dünya'nın merkezi, 6000°C sıcaklığa sahiptir.",
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }
  };
  
  // Havalı yazıyı stilize etmek için fonksiyon
  function generateStyledText(text) {
    const styledText = `
      ██████╗ ███████╗████████╗ ██████╗ ██╗   ██╗███████╗
      ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝
      ██████╔╝███████╗   ██║   ██████╔╝██║   ██║███████╗
      ██╔══██╗╚════██║   ██║   ██╔══██╗██║   ██║╚════██║
      ██████╔╝███████║   ██║   ██████╔╝╚██████╔╝███████║
      ╚═════╝ ╚══════╝   ╚═╝   ╚═════╝  ╚═════╝ ╚══════╝
    `;
    
    return styledText.replace("██████╗ ███████╗████████╗ ██████╗ ██╗   ██╗███████╗", text.toUpperCase());
  }
  
  // Farklı renkler için arka plan, border ve diğer öğelerin renklerini belirleyen yardımcı fonksiyonlar
  const getBackgroundColor = (color) => {
    switch (color) {
      case "red": return "#2d1f1f"; 
      case "green": return "#1f2d1f";
      case "blue": return "#1f1f2d";
      case "yellow": return "#2d2d1f";
      case "cyan": return "#1f2d2d";
      case "magenta": return "#2d1f2d";
      case "black": return "#000000";
      case "white": return "#ffffff";
      default: return "#1e1e1e"; // Default color
    }
  };
  
  const getBorderColor = (color) => {
    switch (color) {
      case "red": return "#ff4d4d";
      case "green": return "#66ff66";
      case "blue": return "#4d94ff";
      case "yellow": return "#ffff66";
      case "cyan": return "#66ffff";
      case "magenta": return "#ff66ff";
      case "black": return "#333333";
      case "white": return "#cccccc";
      default: return "#c3e88d";
    }
  };
  
  const getShadowColor = (color) => {
    switch (color) {
      case "red": return "#ff0000";
      case "green": return "#00ff00";
      case "blue": return "#0000ff";
      case "yellow": return "#ffff00";
      case "cyan": return "#00ffff";
      case "magenta": return "#ff00ff";
      case "black": return "#000000";
      case "white": return "#ffffff";
      default: return "#c3e88d";
    }
  };
  
  const getPromptColor = (color) => {
    switch (color) {
      case "red": return "#ffaaaa";
      case "green": return "#aaffaa";
      case "blue": return "#aaaaff";
      case "yellow": return "#aaaa55";
      case "cyan": return "#55aaaa";
      case "magenta": return "#aa55aa";
      case "black": return "#aaaaaa";
      case "white": return "#ffffff";
      default: return "#82aaff";
    }
  };
  