import { fetchData } from "./main.js"

let loginForm = document.getElementById('loginForm')
if(loginForm) {
  console.log('Login form found, attaching listener');
  loginForm.addEventListener('submit', login);
}

function login(e) {
  e.preventDefault()
  let errorSection = document.getElementById("error")

  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  console.log('Attempting login with username:', username);

  if(validString(username)) {
    errorSection.innerText = `Username cannot be blank!!!`
  } else if(validString(password)) {
    errorSection.innerText = `Password cannot be blank!!!`
  } else {
    errorSection.innerText = ""  

    const user = {
      Username: username,
      Password: password
    }

    fetchData('/user/login', user, "POST")
    .then(data => {
      console.log('Login response:', data);
      if(!data.message && data.username) {
        setCurrentUser(data)
        
        errorSection.style.color = 'green';
        errorSection.innerHTML = `Login successful! Welcome ${data.fullname || username}!<br>Redirecting to services...`
        
        const inputs = loginForm.querySelectorAll('input, button');
        inputs.forEach(input => input.disabled = true);
        
        setTimeout(() => {
          window.location.href = "services.html"
        }, 2000)
      } else {
        throw new Error(data.message || 'Login failed')
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      errorSection.style.color = 'red';
      errorSection.innerText = `${err.message}`

      document.getElementById('password').value = ""
    })
  }
}

function validString(word) {
  return word == "" || word === null || word === undefined
}

let registerForm = document.getElementById("registerForm")
if(registerForm) {
  console.log('Register form found, attaching listener');
  registerForm.addEventListener('submit', register);
}

function register(e) {
  e.preventDefault()
  console.log('Register function called');

  let errorSection = document.getElementById("error")

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const roleSelected = document.getElementById("userRole").value;

  if(password !== confirmPassword) {
    errorSection.innerText = 'Passwords do not match';
    return;
  }

  if(!firstName || !lastName || !username || !email || !password) {
    errorSection.innerText = 'All fields are required';
    return;
  }

  const user = {
    Username: username,
    Password: password,
    Fullname: `${firstName} ${lastName}`,
    Email: email,
    Role: roleSelected 
  }

  console.log('Sending registration data:', user);

  fetchData("/user/register", user, "POST")
  .then(data => {
    console.log('Registration response:', data);
    if(!data.message && data.username) {
      setCurrentUser(data)
    
      errorSection.style.color = 'green';
      errorSection.innerText = 'Account created successfully! Redirecting to login...'
      
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
    } else {
      throw new Error(data.message || 'Registration failed')
    }
  })
  .catch(err => {
    console.error('Registration error:', err);
    errorSection.style.color = 'red';
    errorSection.innerText = `${err.message}`
  })
}  

window.toggleKeyField = function() {
  const userRole = document.getElementById("userRole").value;
  const keyField = document.getElementById("keyField");
  
  if(userRole === 'owner' || userRole === 'technician') {
    keyField.style.display = 'block';
  } else {
    keyField.style.display = 'none';
  }
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}

export function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location.href = "index.html"
}