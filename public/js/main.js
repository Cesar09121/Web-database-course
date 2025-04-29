function login(e){
    e.preventDefault();

    let user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    fetchData('/users/login', 'POST', user) 
    .then(data=>{
        if(!data.message){
            setCurrentUser(data);
            window.location.href = "index.html";
        }
    })
    .catch(err=>{
        let errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = "Invalid username or password";
    });
}
let loginForm = document.getElementById("login-form");
if(loginForm){
    loginForm.addEventListener("submit", login);
}

function validString(word){
    return word && word.trim() !== '';
}

let registerForm = document.getElementById("register-form");
if(registerForm){
    registerForm.addEventListener("submit", register);
}

async function fetchData(route = ' ',data = {}, methodType){
    const response = await fetch(route, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(!response.ok){
        return await response.json();
    }else{
        throw await response.json();
    }
}
function register(e){
    e.preventDefault();
}


function getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUser"));
}
function setCurrentUser(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
}
