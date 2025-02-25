let dropArea = document.getElementById('drop-area');
let textInput = document.getElementById('text-input');
let downloadButton = document.getElementById('download-button');
let yazButton = document.getElementById('yaz-button');
let canvasContainer = document.getElementById('canvas-container');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let loader = document.getElementById('loader');
canvasContainer.style.display = 'none';
let konumlar = []
let karma = []
let ekle = 0
let px = 10
let sayi
var kopya

const radioButtons = document.querySelectorAll('input[name="pixel"]');
let px10Radio = document.getElementById('px10');
let px5Radio = document.getElementById('px5');
let px1Radio = document.getElementById('px1');


radioButtons.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) {
            px = parseInt(this.value)
        }
    })
})

function handleImageUpload(file) {
    if (file) {
        let reader = new FileReader();
        loader.style.display = 'block';
        canvasContainer.style.display = 'none';

        reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;
                if (width % 5 !== 0 || height % 5 !== 0) {
                    px = 1;
                    px1Radio.checked = true;
                    px5Radio.checked = false;
                    px10Radio.checked = false;
                } else {
                    radioButtons.forEach(radio => {
                        if (radio.checked) {
                            px = parseInt(radio.value);
                        }
                    });
                }

                canvas.width = img.width
                canvas.height = img.height
                ekle = 0
                let deger = (img.width * img.height) / (px * px)
                karma = new Array(deger)

                while (ekle < (deger)) {
                    karma[ekle] = ekle;
                    ekle++;
                }
                karma.sort(() => Math.random() - 0.5);
                konumlar = []
                for (let i = 0; i < img.height; i += px) {
                    for (let j = 0; j < img.width; j += px) {
                        konumlar.push([j, i]);
                    }
                }
                if (textInput.value.trim() !== "") {
                    let inputKarma = textInput.value.split(",");
                    if (inputKarma.length === karma.length) {
                        karma = inputKarma;
                        yazButton.style.display = 'none';
                        textInput.value = "";
                        for (let g = 0; g < deger; g++) {
                            context.drawImage(img, konumlar[g][0], konumlar[g][1], px, px, konumlar[karma[g]][0], konumlar[karma[g]][1], px, px);
                        }
                    } else {
                        alert("Girdiğiniz sayısal veri, resmin boyutlarıyla uyuşmuyor. Lütfen doğru veriyi girdiğinizden emin olun.");
                    }
                } else {
                    yazButton.style.display = "inline-block";
                    for (let g = 0; g < deger; g++) {
                        context.drawImage(img, konumlar[karma[g]][0], konumlar[karma[g]][1], px, px, konumlar[g][0], konumlar[g][1], px, px);
                    }
                }
                console.log("Toplam: " + deger + " parça");

                canvasContainer.style.display = 'flex';
                downloadButton.style.display = 'inline-block';
                loader.style.display = 'none';
                sayi = Math.floor(Math.random() * 10000)
                kopya = karma.toString()
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = 'green';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#ccc';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

dropArea.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
        const file = event.target.files[0];
        handleImageUpload(file);
    };
    input.click();
});

downloadButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = "resim" + sayi + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

yazButton.addEventListener('click', async () => {
    try {
        let textData = karma
        navigator.clipboard.writeText(kopya) // sadece https
        let blob = new Blob([textData], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = "veri" + sayi + ".txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    } catch {
        alert('Bu işlem yalnızca bilgisayarlarda çalışmaktadır.');
    }
})

textInput.addEventListener('dragover', (event) => {
    event.preventDefault();
    textInput.style.borderColor = 'green';
});

textInput.addEventListener('dragleave', () => {
    textInput.style.borderColor = '#ccc';
});

textInput.addEventListener('drop', (event) => {
    event.preventDefault();
    textInput.style.borderColor = '#ccc';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                textInput.value = e.target.result;
            };
            reader.readAsText(file);
        } else {
            alert('Lütfen sadece .txt dosyası bırakın.');
        }
    }
});