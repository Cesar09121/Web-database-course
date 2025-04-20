class Service {
  constructor(name, price, duration) {
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.serviceId = 'serv_' + Math.random().toString(36).substr(2, 9);
    this.createdAt = new Date();
  }
  
  getServiceName() {
    return this.name;
  }
  
  getServicePrice() {
    return this.price;
  }
  
  setServicePrice(price) {
    this.price = price;
  }
}
function fadeOutAndNavigate(page) {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = page;
  }, 500);
}
let isProcessingChange = false;
document.addEventListener('DOMContentLoaded', function() {
  const serviceCheckboxes = document.querySelectorAll("input[name='service']");
  if (serviceCheckboxes.length > 0) {
    serviceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (!isProcessingChange) {
          isProcessingChange = true;
          selectServiceList();
          setTimeout(() => {
            isProcessingChange = false;
          }, 100);
        }
      });
    });
  }
});

// selected services
function selectServiceList() {
  console.clear();
  
  const selectedServices = document.querySelectorAll("input[name='service']:checked");
  const serviceList = document.getElementById("selected-services");
  
  if (serviceList) {
    serviceList.innerHTML = ""; 
    
    selectedServices.forEach(service => {
      let listItem = document.createElement("li");
      listItem.textContent = service.value.replace(/-/g, " ");
      serviceList.appendChild(listItem);
    });
    updatePriceAndTime();
    createServiceObjects();
  }
}

function updatePriceAndTime() {
  const selectedServices = document.querySelectorAll("input[name='service']:checked");
  let totalPrice = 0;
  let totalTime = 0;

  selectedServices.forEach(service => {
    if (service.value.includes("manicure")) {
      totalPrice += 25;
      totalTime += 30;
    } else if (service.value.includes("pedicure")) {
      totalPrice += 35;
      totalTime += 45;
    } else if (service.value.includes("waxing")) {
      totalPrice += 20;
      totalTime += 15;
    }
  });
  
  const priceElement = document.getElementById("total-price");
  const durationElement = document.getElementById("total-duration");
  
  if (priceElement) priceElement.textContent = totalPrice.toFixed(2);
  if (durationElement) durationElement.textContent = totalTime;
  
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("totalDuration", totalTime);
}
function createServiceObjects() {
  const selectedServices = document.querySelectorAll("input[name='service']:checked");
  const services = [];
  
  selectedServices.forEach(service => {
    let price = 0;
    let duration = 0;
    
    if (service.value.includes("manicure")) {
      price = 25;
      duration = 30;
    } else if (service.value.includes("pedicure")) {
      price = 35;
      duration = 45;
    } else if (service.value.includes("waxing")) {
      price = 20;
      duration = 20;
    }
    
    // Service object
    const serviceObj = new Service(service.value, price, duration);
    services.push(serviceObj);
  });
  

  console.log("Selected Services:", services.map(s => s.name).join(", "));
  services.forEach((service, index) => {
    console.log(`Service ${index + 1}: ${service.name}, Price: $${service.price}, Duration: ${service.duration} min`);
  });

  localStorage.setItem("selectedServices", JSON.stringify(services.map(s => s.name)));
}