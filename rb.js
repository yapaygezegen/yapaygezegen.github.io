const uploadBox = document.getElementById('uploadBox');
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('previewContainer');
        const widthInput = document.getElementById('widthInput');
        const heightInput = document.getElementById('heightInput');
        const widthOptions = document.getElementById('widthOptions');
        const heightOptions = document.getElementById('heightOptions');
        const clearBtn = document.getElementById('clearBtn');
        let processedImages = [];

        const storedWidths = localStorage.getItem('downloadedWidths');
        const storedHeights = localStorage.getItem('downloadedHeights');

        if (storedWidths) {
            JSON.parse(storedWidths).forEach(width => {
                const option = document.createElement('option');
                option.value = width;
                widthOptions.appendChild(option);
            });
        }

        if (storedHeights) {
            JSON.parse(storedHeights).forEach(height => {
                const option = document.createElement('option');
                option.value = height;
                heightOptions.appendChild(option);
            });
        }

        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', handleFileSelect);

        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.classList.add('dragover');
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.classList.remove('dragover');
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.classList.remove('dragover');
            Array.from(e.dataTransfer.files).forEach(file => handleFile(file));
        });

        function handleFileSelect(e) {
            Array.from(e.target.files).forEach(file => handleFile(file));
        }

        function handleFile(file) {
            if (file) {
                const width = parseInt(widthInput.value) || 1920;
                const height = parseInt(heightInput.value) || 1080;
                
                widthInput.value = Math.max(width, 1);
                heightInput.value = Math.max(height, 1);

                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        canvas.width = widthInput.value;
                        canvas.height = heightInput.value;
                        
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        
                        const processedImage = canvas.toDataURL('image/jpeg');
                        const previewImage = document.createElement('img');
                        previewImage.src = processedImage;
                        previewImage.classList.add('image-preview');
                        
                        const downloadLink = document.createElement('button');
                        downloadLink.classList.add('download-btn');
                        downloadLink.textContent = 'İndir';
                        downloadLink.onclick = function() {
                            const fileName = file.name.replace(/\.[^/.]+$/, "") + `_${width}x${height}.jpg`;
                            const link = document.createElement('a');
                            link.href = processedImage;
                            link.download = fileName;
                            link.click();
                        };

                        const previewDiv = document.createElement('div');
                        previewDiv.classList.add('preview-container');
                        previewDiv.appendChild(previewImage);
                        previewDiv.appendChild(downloadLink);
                        
                        previewContainer.appendChild(previewDiv);

                        updateSuggestions(width, height);

                        // Temizle butonunu göster
                        clearBtn.style.display = 'block';
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }


        clearBtn.addEventListener('click', () => {
            previewContainer.innerHTML = '';
            widthInput.value = '';
            heightInput.value = '';
            clearBtn.style.display = 'none';
        });

        function downloadImages() {
            const allLinks = previewContainer.querySelectorAll('.download-btn');
            allLinks.forEach(link => link.click());
        }

        function updateSuggestions(width, height) {
            if (!widthOptions.querySelector(`option[value="${width}"]`)) {
                const option = document.createElement('option');
                option.value = width;
                widthOptions.appendChild(option);
                updateLocalStorage('downloadedWidths', width);
            }

            if (!heightOptions.querySelector(`option[value="${height}"]`)) {
                const option = document.createElement('option');
                option.value = height;
                heightOptions.appendChild(option);
                updateLocalStorage('downloadedHeights', height);
            }
        }

        function updateLocalStorage(key, value) {
            let values = JSON.parse(localStorage.getItem(key)) || [];
            if (!values.includes(value)) {
                values.push(value);
                values.sort((a, b) => b - a);
                localStorage.setItem(key, JSON.stringify(values));
            }
        }