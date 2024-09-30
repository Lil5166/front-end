document.addEventListener('DOMContentLoaded', function() {
    const name = document.getElementById('name');
    const group = document.getElementById('group');
    const phone = document.getElementById('phone');
    const faculty = document.getElementById('faculty');
    const address = document.getElementById('address');
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.getElementById('infoForm');

    const namePattern = /^[А-ЯІЇЄҐ][а-яіїєґ]+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    const groupPattern = /^[А-ЯІЇЄҐа-яіїєґ]{2}-\d{2}$/;
    const phonePattern = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    const facultyPattern = /^[А-ЯІЇЄҐа-яіїєґ]{4}$/;
    const addressPattern = /^м\.\s[А-ЯІЇЄҐа-яіїєґ]+$/;

    function validateInput(input, pattern, errorMessage) {
        if (!pattern.test(input.value)) {
            showError(input, errorMessage);
        } else {
            clearError(input);
        }
        checkFormValidity();
    }

    function showError(input, message) {
        input.style.borderColor = 'red';
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('span');
            error.classList.add('error-message');
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.classList.remove('valid');
    }

    function clearError(input) {
        input.style.borderColor = '';
        let error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
        input.classList.add('valid');
        input.style.borderColor = 'green';
    }

    function checkFormValidity() {
        const inputs = [name, group, phone, faculty, address];
        const allValid = inputs.every(input => input.classList.contains('valid'));
        submitButton.disabled = !allValid;
    }

    name.addEventListener('input', function() {
        validateInput(name, namePattern, 'Помилка: ПІБ має бути у форматі "Прізвище І.О."');
    });

    group.addEventListener('input', function() {
        validateInput(group, groupPattern, 'Помилка: Група має бути у форматі "ТТ-ЧЧ"');
    });

    phone.addEventListener('input', function() {
        validateInput(phone, phonePattern, 'Помилка: Телефон має бути у форматі "(XXX)-XXX-XX-XX"');
    });

    faculty.addEventListener('input', function() {
        validateInput(faculty, facultyPattern, 'Помилка: Факультет має складатися з 4 літер');
    });

    address.addEventListener('input', function() {
        validateInput(address, addressPattern, 'Помилка: Адреса має бути у форматі "м. Місто"');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = `
            <p>ПІБ: ${name.value}</p>
            <p>Група: ${group.value}</p>
            <p>Телефон: ${phone.value}</p>
            <p>Факультет: ${faculty.value}</p>
            <p>Адреса: ${address.value}</p>
        `;
        const newWindow = window.open('about:blank', '_blank');
        newWindow.document.open();
        newWindow.document.write(formData);
        newWindow.document.close();
    });

    checkFormValidity();
});


document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('numberTable');
    const colorPicker = document.getElementById('colorPicker');
    const variantNumber = 3; // Change this to your variant number

    // Create the 6x6 table
    let number = 1;
    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            const cell = row.insertCell();
            cell.textContent = number;
            cell.dataset.number = number;

            // Add event listeners
            cell.addEventListener('mouseover', function() {
                if (parseInt(cell.dataset.number) === variantNumber) {
                    cell.style.backgroundColor = getRandomColor();
                }
            });

            cell.addEventListener('click', function() {
                if (parseInt(cell.dataset.number) === variantNumber) {
                    cell.style.backgroundColor = colorPicker.value;
                }
            });

            cell.addEventListener('dblclick', function() {
                changeDiagonalColors(colorPicker.value);
            });

            number++;
        }
    }

    // Function to get a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to change the color of the main diagonal cells
    function changeDiagonalColors(color) {
        for (let i = 0; i < 6; i++) {
            table.rows[i].cells[i].style.backgroundColor = color;
        }
    }
});