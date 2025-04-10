function fadeOutAndNavigate(page) {
    document.body.style.opacity = 0; 
    setTimeout(() => {
        window.location.href = page; 
    }, 500);
}


// selected services function
function selectServiceList() {
    const selectedServices = document.querySelectorAll(".dropdown input:checked");
    const listItem = document.createElementById("selected-services");

    serviceList.innerHTML = ""; // clear previous selected list items

    selectedServices.forEach(service => {
        let listItem = document.createElement("li");
        listItem.textContent = service.value.replace("-", " "); 
        serviceList.appendChild(listItem);
});
}
// user have to fill the form before submitting
document.getElementById('loginForm').addEventListener('submit', function (event) {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please fill in both email and password fields.');
        event.preventDefault(); // prevent user from submitting the form without filling the fields
    }

});function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//signup form validation
function validateSignupForm() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false; // prevent form submission
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false; // prevent form submission
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false; // prevent form submission
    }

    return true; // allow form submission
}

// select services function
function selectServiceList() {
    const selectedServices = document.querySelectorAll(".dropdown input:checked");
    const serviceList = document.getElementById("selected-services");

    serviceList.innerHTML = ""; // clear previous selected list items

    selectedServices.forEach(service => {
        let listItem = document.createElement("li");
        listItem.textContent = service.value.replace("-", " "); 
        serviceList.appendChild(listItem);
});
}








function login(e){
    const user ={

    }
    let selectedServices = document.querySelectorAll(".dropdown input:checked");
    let listItem = document.createElement("li");
}
