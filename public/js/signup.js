// Code to handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form values
    var firstName = document.querySelector('input[name="first name"]').value;
    var lastName = document.querySelector('input[name="last name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="psw"]').value;
    var confirmPassword = document.querySelector('input[name="psw-confirmation"]').value;

    // Validate form inputs
    if (firstName.trim() === '') {
        alert('Please enter your First Name.');
        return;
    }

    if (lastName.trim() === '') {
        alert('Please enter your Last Name.');
        return;
    }

    if (email.trim() === '') {
        alert('Please enter your Email.');
        return;
    }

    if (password.trim() === '') {
        alert('Please enter a Password.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Submit the form if all validations pass
    alert('Sign up successful!');
    // Uncomment the line below to actually submit the form
    this.submit();
});