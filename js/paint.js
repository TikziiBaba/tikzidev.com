const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 250;
canvas.height = window.innerHeight;

let drawing = false;
let tool = 'pen';
let color = document.getElementById('color').value;
let fillColor = document.getElementById('fillColor').value;
let isFill = document.getElementById('fill').checked;
let lineWidth = document.getElementById('size').value;
let bgColor = document.getElementById('bgColor').value;

let history = [];
let startX, startY, currentX, currentY;

// Tuvalin arka planını ayarla
function setCanvasBackground() {
    bgColor = document.getElementById('bgColor').value;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
}

// Araç seç
function setTool(selectedTool) {
    tool = selectedTool;
}

// Canvas durumunu kaydet
function saveState() {
    history.push(canvas.toDataURL());
}

// Geri al
function undo() {
    if (history.length > 0) {
        let img = new Image();
        img.src = history.pop();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

// Tuvali temizle
function clearCanvas() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
}

// Canvas'ı kaydet
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'cizim.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Anlık çizimi güncelle
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = history[history.length - 1]; // Son durum
    img.onload = () => {
        ctx.drawImage(img, 0, 0);

        const width = currentX - startX;
        const height = currentY - startY;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = fillColor;

        if (tool === 'rectangle') {
            if (isFill) ctx.fillRect(startX, startY, width, height);
            ctx.strokeRect(startX, startY, width, height);
        } else if (tool === 'circle') {
            const radius = Math.sqrt(width ** 2 + height ** 2);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            if (isFill) ctx.fill();
            ctx.stroke();
        }
    };
}

// Mouse basılı tutulduğunda
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    color = document.getElementById('color').value;
    fillColor = document.getElementById('fillColor').value;
    isFill = document.getElementById('fill').checked;
    lineWidth = document.getElementById('size').value;

    if (tool === 'pen') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }

    if (tool === 'rectangle' || tool === 'circle') {
        saveState(); // Dikdörtgen ve daire çizimine başlamadan önce kaydet ki öncekiler bozulmasın
    }
});

// Mouse hareket ettiğinde
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    currentX = e.offsetX;
    currentY = e.offsetY;

    if (tool === 'pen') {
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    } else if (tool === 'eraser') {
        ctx.clearRect(currentX, currentY, 10, 10);
    } else if (tool === 'rectangle' || tool === 'circle') {
        redraw(); // Dikdörtgen veya daire için anlık çizim
    }
});

// Mouse bırakıldığında
canvas.addEventListener('mouseup', (e) => {
    drawing = false;

    if (tool === 'rectangle' || tool === 'circle') {
        saveState(); // Dikdörtgen veya daire çizimini bitirince durumu kaydet
    }
});

// Başlangıçta arka planı beyaz yap
setCanvasBackground();
