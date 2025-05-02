import { fetchData } from "./main.js"
let loginForm = document.getElementById('loginForm')
if(loginForm) loginForm.addEventListener('submit', login)

function login(e) {
  e.preventDefault()
  let errorSection = document.getElementById("error")

  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  if(validString(username)) {
    errorSection.innerText = `Username cannot be blank!!!`
  } else {
    errorSection.innerText = ""  

    const user = {
      Username: username,
      Password: password
    }

    fetchData('/user/login', user, "POST")
    .then(data => {
      if(!data.message) {
        setCurrentUser(data)
        window.location.href = "index.html"
      }
    })
    .catch(err => {
      errorSection.innerText = `${err.message}`
    })
  
    let section = document.getElementById("welcome")
    section.innerHTML = `Welcome, ${username}!`
  
    console.log(user)
  }
  document.getElementById('username').value = ""
  document.getElementById('password').value = ""

}

function validString(word) {
  return word == ""
}

let registerForm = document.getElementById("registerForm")
if(registerForm) registerForm.addEventListener('submit', register)

function register(e) {
  e.preventDefault() 

  let errorSection = document.getElementById("error")

  const user = {
    Username: document.getElementById("username").value,
    Password: document.getElementById("password").value,
    FirstName: document.getElementById("firstName").value,
    LastName: document.getElementById("lastName").value,
    Email: document.getElementById("email").value
  }

  fetchData("/user/register", user, "POST")
  .then(data => {
    if(!data.message) {
      setCurrentUser(data)
      window.location.href = "index.html"
    }
  })
  .catch(err => {
    errorSection.innerText = `${err.message}`
  })
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