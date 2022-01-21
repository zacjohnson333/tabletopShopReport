const form = document.getElementById('form');
const shopName = document.getElementById('name');
const shopLocation = document.getElementById('location');
const shopPhone = document.getElementById('phone');
const shopHours = document.getElementById('hours');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    submitForm();
});




function checkInputs() {
    const shopNameValue = shopName.value.trim();
    const shopLocationValue = shopLocation.value.trim();
    const shopPhoneValue = shopPhone.value.trim();
    const shopHoursValue = shopHours.value.trim();

    if (shopNameValue === '') {
        setErrorFor(shopName, 'Shop name cannot be blank');
    } else {
        setSuccessFor(shopName, 'Looks good!');
    }

    if (shopLocationValue === '') {
        setErrorFor(shopLocation, 'Location cannot be blank');
    } else {
        setSuccessFor(shopLocation, 'Looks good!');
    }

    if (shopPhoneValue === '') {
        setErrorFor(shopPhone, 'Phone number cannot be blank');
    } else if (!shopPhoneValue.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
        setErrorFor(shopPhone, 'Please enter a valid phone number');
    } else {
        setSuccessFor(shopPhone, 'Looks good!');
    }

    if (shopHoursValue === '') {
        setErrorFor(shopHours, 'Shop hours cannot be blank');
    } else {
        setSuccessFor(shopHours, 'Looks good!');
    }
}

function setErrorFor(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = msg;
    formControl.classList.remove('success');
    formControl.classList.add('error');
}

function setSuccessFor(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = msg;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

function submitForm() {
    if (shopName.parentElement.classList.contains('success')) {
        if (shopLocation.parentElement.classList.contains('success')) {
            if (shopPhone.parentElement.classList.contains('success')) {
                if (shopHours.parentElement.classList.contains('success')) {
                    form.submit();
                }
            }
        }
    }
}