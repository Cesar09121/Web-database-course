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

function validString(word) {
    return word.trim() === "";
}


document.addEventListener('DOMContentLoaded', function() {
    // login form
    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    
    // set up registration form if it exists
    let signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', register);
    }
});

// login function
function login(e) {
    e.preventDefault();
    
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    
    if (validString(email) || validString(password)) {
        alert('Email and password cannot be blank!');
        return;
    }
    
    const loginUser = new User(null, null, email, password, null);
    console.log('Login attempt:', loginUser);
}

// registration function
function register(e) {
    e.preventDefault();
    
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let role = document.getElementById('userRole').value;
    
    if (validString(email) || validString(password) || validString(firstName) || validString(lastName)) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newUser = new User(firstName, lastName, email, password, role);
    console.log('New User Registration:', newUser);
}

function fadeOutAndNavigate(page) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}
function toggleKeyField() {
    const userRole = document.getElementById('userRole');
    const keyField = document.getElementById('keyField');
    
    if (userRole && keyField) {
        if (userRole.value === '2' || userRole.value === '3') {
            keyField.style.display = 'block';
        } else {
            keyField.style.display = 'none';
        }
    }
}