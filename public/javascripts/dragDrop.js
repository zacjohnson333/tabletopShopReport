document.querySelectorAll('.dropZoneInput').forEach(inputElement => {
    const dropZoneElement = inputElement.closest('.dropZone');

    dropZoneElement.addEventListener('click', e => {
        inputElement.click();
    });

    inputElement.addEventListener('change', e => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    })

    dropZoneElement.addEventListener('dragover', e => {
        e.preventDefault();
        dropZoneElement.classList.add('dropZoneOver');
    });

    ['dragleave', 'dragend'].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove('dropZoneOver');
        });
    });

    dropZoneElement.addEventListener('drop', e => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }
        dropZoneElement.classList.remove('dropZoneOver');
    });
});

/**
 * 
 * @param {HTMLElement} dropZoneElement 
 * @param {File} file 
 */

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector('.dropZoneThumb');

    // First time - remove the prompt
    if (dropZoneElement.querySelector('.dropZonePrompt')) {
        dropZoneElement.querySelector('.dropZonePrompt').remove();
    }
    // First time - there is no thumbnail element, so we create one
    if (!thumbnailElement) {
        thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('dropZoneThumb');
        dropZoneElement.appendChild(thumbnailElement);
    }
    thumbnailElement.dataset.label = file.name;
    // Show thumbnail for image files
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        }
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}