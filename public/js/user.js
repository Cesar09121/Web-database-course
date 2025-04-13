function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// this class is used to create user objects
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.createdAt = new Date();
    }
}

//signup form validation
function validateSignupForm() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false; 
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false; 
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false; 
    }
    
    return true; 
}

// user have to fill the form before submitting
document.getElementById('loginForm').addEventListener('submit', function (event) {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        alert('Please fill in both email and password fields.');
        event.preventDefault(); // prevent user from submitting the form without filling the fields
    } else {
        event.preventDefault(); // prevent form submission to stay on page
        
        const loginUser = new User(email, password);

        console.log('Login User:');
        console.log(loginUser);
    }
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (validateSignupForm()) {
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        
        const newUser = new User(email, password);
        
        console.log('New User:');
        console.log(newUser);
    }
});

if (typeof window.fadeOutAndNavigate !== 'function') {
    window.fadeOutAndNavigate = function(page) {
        document.body.style.opacity = 0; 
        setTimeout(() => {
            window.location.href = page; 
        }, 500);
    }
}
