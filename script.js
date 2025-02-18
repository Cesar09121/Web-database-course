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