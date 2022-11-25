const emailInput = document.querySelector('#email-input');
const countryInput = document.querySelector('#country-input');
const zipcodeInput = document.querySelector('#zipcode-input');
const passwordInput = document.querySelector('#password-input');
const passwordConfirmationInput = document.querySelector('#password-confirmation-input');

const form = document.querySelector('#sign-up')

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isEmailValid = checkEmail();
    let isCountryValid = checkCountry();
    let isZipcodeValid = checkZipcode();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();
    

    let isFormValid = isEmailValid && isCountryValid && isZipcodeValid && isPasswordValid && isConfirmPasswordValid;

    if (isFormValid) {

    }
})

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

const isCountryValid = (country) => {
    const re = new RegExp("[a-zA-Z]{2,}");
    return re.test(country);
}

const isZipcodeValid = (zipcode) => {
    const re = new RegExp("^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$");
    return re.test(zipcode); 
}

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('p');
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('p');
    error.textContent = '';
}

const isRequired = value => value === '' ? false: true;

const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if (!isRequired(email)) {
        showError(emailInput, 'Email cannot be blank');
    } else if (!isEmailValid(email)) {
        showError(emailInput, 'Email is not valid');
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
};

const checkZipcode = () => {
    let valid = false;
    const zipcode = zipcodeInput.value.trim();
    if (!isRequired(zipcode)) {
        showError(zipcodeInput, 'ZIP Code cannot be blank');
    } else if (!isZipcodeValid(zipcode)) {
        showError(zipcodeInput, 'ZIP code is not valid');
    } else {
        showSuccess(zipcodeInput);
        valid = true;
    }
    return valid;
};

const checkCountry = () => {
    let valid = false;
    const country = countryInput.value.trim();
    if (!isRequired(country)) {
        showError(countryInput, 'Country cannot be blank');
    } else if (!isCountryValid(country)) {
        showError(countryInput, 'Country is not valid')
    } else {
        showSuccess(countryInput);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    let valid = false;
    const password = passwordInput.value.trim();
    if (!isRequired(password)) {
        showError(passwordInput, 'Password cannot be blank');
    } else if (!isPasswordSecure(password)) {
        showError(passwordInput, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)');
    } else {    
        showSuccess(passwordInput);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = passwordConfirmationInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(passwordConfirmationInput, 'Please enter your password again');
    } else if (password !== confirmPassword) {
        showError(passwordConfirmationInput, 'Passwords do not match')
    } else {
        showSuccess(passwordConfirmationInput);
        valid = true;
    }
    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        //cancel previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //setup new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'email': 
            checkEmail();
            break;
        case 'zipcode':
            checkZipcode();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));