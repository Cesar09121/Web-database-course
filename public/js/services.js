const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function() {
  fetch(`${API_URL}/services/getAllServices`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(services => {
      displayServices(services);
    })
    .catch(error => {
      console.error("Error loading services:", error);
      document.querySelector('.service-categories').innerHTML = 
        '<p class="error">Sorry, we couldn\'t load our services. Please try again later.</p>';
    });
});
function displayServices(services) {

  const servicesByCategory = {
    "Manicure": services.filter(s => s.service_name.includes("Manicure")),
    "Pedicure": services.filter(s => s.service_name.includes("Pedicure")),
    "Other Services": services.filter(s => !s.service_name.includes("Manicure") && !s.service_name.includes("Pedicure"))
  };
  
  const categoriesContainer = document.querySelector('.service-categories');
  categoriesContainer.innerHTML = '';
  
  for (const [category, categoryServices] of Object.entries(servicesByCategory)) {
    if (categoryServices.length === 0) continue;
    
    const categoryHeader = document.createElement('h2');
    categoryHeader.textContent = category;
    categoriesContainer.appendChild(categoryHeader);
    
    categoryServices.forEach(service => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'service';
      checkbox.value = service.service_id;
      checkbox.dataset.name = service.service_name;
      checkbox.dataset.price = service.price;
      checkbox.dataset.duration = service.duration;
      checkbox.setAttribute('onchange', 'selectServiceList()');
      
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${service.service_name} - $${service.price} (${service.duration} min)`));
      
      categoriesContainer.appendChild(label);
    });
  }
  const selectedServicesHeader = document.createElement('h3');
  selectedServicesHeader.textContent = 'Selected Services:';
  
  const selectedServicesList = document.createElement('ul');
  selectedServicesList.id = 'selected-services';
  
  const serviceSummary = document.createElement('div');
  serviceSummary.id = 'service-summary';
  serviceSummary.innerHTML = `
    <p>Total Price: $<span id="total-price">0.00</span></p>
    <p>Estimated Duration: <span id="total-duration">0</span> minutes</p>
  `;
  
  categoriesContainer.appendChild(selectedServicesHeader);
  categoriesContainer.appendChild(selectedServicesList);
  categoriesContainer.appendChild(serviceSummary);
}
const bookingButton = document.getElementById('booking-button');


function selectServiceList() {
  const selectedCheckboxes = document.querySelectorAll('input[name="service"]:checked');
  const selectedServicesList = document.getElementById('selected-services');
  const totalPriceElement = document.getElementById('total-price');
  const totalDurationElement = document.getElementById('total-duration');
  
  selectedServicesList.innerHTML = '';
  let totalPrice = 0;
  let totalDuration = 0;
  selectedCheckboxes.forEach(checkbox => {
    const serviceName = checkbox.dataset.name;
    const servicePrice = parseFloat(checkbox.dataset.price);
    const serviceDuration = parseInt(checkbox.dataset.duration);
    
    const listItem = document.createElement('li');
    listItem.textContent = `${serviceName} - $${servicePrice.toFixed(2)} (${serviceDuration} min)`;
    selectedServicesList.appendChild(listItem);
    
    totalPrice += servicePrice;
    totalDuration += serviceDuration;
  });
  
  totalPriceElement.textContent = totalPrice.toFixed(2);
  totalDurationElement.textContent = totalDuration;
  
  const selectedServices = Array.from(selectedCheckboxes).map(checkbox => ({
    id: checkbox.value,
    name: checkbox.dataset.name,
    price: parseFloat(checkbox.dataset.price),
    duration: parseInt(checkbox.dataset.duration)
  }));
  
  localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
}

window.selectServiceList = selectServiceList;

function fadeOutAndNavigate(url) {
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
  
  if (selectedServices.length === 0) {
    alert('Please select at least one service before proceeding.');
    return;
  }
  const currentUser = JSON.parse(localStorage.getItem('user'));
  
  if (currentUser && currentUser.user_id) {
    fetch(`${API_URL}/services/saveSelectedServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.user_id,
        services: selectedServices
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Services saved successfully:', data);
    })
    .catch(error => {
      console.error('Error saving services:', error);
    });
  }
  
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

window.fadeOutAndNavigate = fadeOutAndNavigate;