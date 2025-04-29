import {fetchData} from  "./main";


// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// String validation helper
function validString(word) {
    return word.trim() !== "";
}

// User class
class User {
    constructor(firstName, lastName, email, password, role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = new Date();
    }
}

// Form validation
function validateSignupForm() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
        console.log('Login form listener added');
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', register);
        console.log('Signup form listener added'); 
    }
});

// Login function
function login(e) {
    e.preventDefault();
    console.log('Login function called');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!validString(email) || !validString(password)) {
        alert('Email and password cannot be blank!');
        return;
    }
    
    const loginUser = new User(null, null, email, password, null);
    console.log('Login attempt:', loginUser);
}

// Registration function
function register(e) {
    e.preventDefault();
    console.log('Register function called'); 
    
    if (validateSignupForm()) {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.getElementById('userRole').value;
        
        const newUser = new User(firstName, lastName, email, password, role);
        console.log('New User Registration:', newUser);
        
        alert('Account created successfully!');
    }
}

function fadeOutAndNavigate(page) {
    console.log('Navigating to:', page);
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

function toggleKeyField() {
    const userRole = document.getElementById('userRole');
    const keyField = document.getElementById('keyField');
    
    if (userRole && keyField) {
        keyField.style.display = (userRole.value === '2' || userRole.value === '3') ? 'block' : 'none';
    }
}