document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal");
    const output = document.querySelector(".output");
    const input = document.querySelector(".input");
  
    // Çıktıyı terminale ekleme fonksiyonu
    const appendOutput = (text) => {
      const line = document.createElement("div");
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight; // Otomatik kaydırma
    };
  
    // İlk terminal başlatıldığında karşılama mesajı göster
    appendOutput("Web terminaline hoş geldiniz!");
    appendOutput("cmd: 'help' komutunu yazarak mevcut komutları görebilirsiniz.");
  
    // Komutları işleme fonksiyonu
    const handleCommand = (cmd) => {
      const [command, ...args] = cmd.split(" "); // Komutu ve argümanları ayır
  
      // Eğer komut varsa, fonksiyonu çalıştır
      if (commands[command]) {
        const result = commands[command](args.join(" ")); // Argümanları komuta gönder
        if (result === "clear") {
          output.innerHTML = ""; // clear komutu
        } else if (result === "Yeni terminal başlatılıyor...") {
          output.innerHTML = ""; // /new komutu çalıştırıldığında terminali sıfırlayın
          appendOutput("Web terminaline hoş geldiniz!");
          appendOutput("cmd: 'help' komutunu yazarak mevcut komutları görebilirsiniz.");
        } else {
          appendOutput(result); // Komut sonucunu terminalde göster
        }
      } else {
        appendOutput(`'${cmd}' geçerli bir komut değil. 'help' yazmayı deneyin.`);
      }
    };
  
    // Enter tuşuna basıldığında komutu gönderme
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();  // Sayfanın yeniden yüklenmesini engellemek için
  
        const cmd = input.value.trim();  // Input değerini al
        if (cmd) {
          appendOutput(`$ ${cmd}`);  // Komutu terminalde göster
          handleCommand(cmd);  // Komutu işle
        }
  
        // Komut işlendiğinde inputu temizle
        input.value = "";
      }
    });
  
    // Input'a odaklanma (ilk başta odaklanmasını sağlamak için)
    input.focus();
  });
  