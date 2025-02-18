function fadeOutAndNavigate(page) {
    document.body.style.opacity = 0; 
    setTimeout(() => {
        window.location.href = page; 
    }, 500);
}
// services dropdown
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// selected services function
function selectServiceList() {
    const selectedServices = document.querySelectorAll(".dropdown input:checked");
    const listItem = document.createElementById("selected-services");

    serviceList.innerHTML = ""; // clear previous selected list items

    selectedServices.forEach(service => {
        let listItem = document.createElement("li");
        listItem.textContent = service.value;
        serviceList.appendChild(listItem);
});
}