const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const stickers = [];

function resizeAndDrawImage(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

upload.addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                resizeAndDrawImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('addSticker').addEventListener('click', function() {
    stickers.push(canvas.toDataURL('image/png'));
    alert('Figurinha adicionada ao pacote!');
});

document.getElementById('sticker-pack-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const packName = document.getElementById('packName').value;
    const packAuthor = document.getElementById('packAuthor').value;

    const stickerPack = {
        name: packName,
        author: packAuthor,
        stickers: stickers,
    };

    console.log('Pacote de Figurinhas Gerado:', stickerPack);
    alert('Pacote de Figurinhas Gerado com Sucesso!');
});

document.getElementById('shareButton').addEventListener('click', function() {
    if (stickers.length === 0) {
        alert('Adicione uma figurinha antes de compartilhar!');
        return;
    }

    const imageUri = stickers[0]; // Vamos compartilhar a primeira figurinha como teste
    shareStickerToWhatsApp(imageUri);
});

function shareStickerToWhatsApp(imageUri) {
    const intentUri = `intent://send?file=${encodeURIComponent(imageUri)}#Intent;scheme=content;package=com.whatsapp;end;`;
    window.location.href = intentUri;
}

// Registrar o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso.'))
        .catch(error => console.error('Erro ao registrar o Service Worker:', error));
}
