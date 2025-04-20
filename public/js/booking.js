class Booking {
    constructor(salon, date, time, services, technicianId = 'any') {
        this.salon = salon;
        this.date = date;
        this.time = time;
        this.services = services;
        this.technicianId = technicianId;
        this.bookingId = 'book_' + Math.random().toString(36).substr(2, 9);
        this.status = 'pending';
        this.createdAt = new Date();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    const today = new Date();
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.valueAsDate = today;
    }
    
    loadSalons();
    loadSelectedServices();
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
    
    const confirmButton = document.querySelector('button[type="submit"]');
    if (confirmButton) {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleBooking(e);
        });
    }
    
    // Salon selection change event
    const salonMenu = document.getElementById('salon-menu');
    if (salonMenu) {
        salonMenu.addEventListener('change', loadAvailableTechnicians);
    }
    
    // Date and time change events
    const timeInput = document.getElementById('time');
    class Booking {
        constructor(salon, date, time, services, technicianId = 'any') {
            this.salon = salon;
            this.date = date;
            this.time = time;
            this.services = services;
            this.technicianId = technicianId;
            this.bookingId = 'book_' + Math.random().toString(36).substr(2, 9);
            this.status = 'pending';
            this.createdAt = new Date();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Set default date to today
        const today = new Date();
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.valueAsDate = today;
        }
        
        loadSalons();
        loadSelectedServices();
        
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBooking);
        }
        
        const confirmButton = document.querySelector('button[type="submit"]');
        if (confirmButton) {
            confirmButton.addEventListener('click', function(e) {
                e.preventDefault();
                handleBooking(e);
            });
        }
        
        // Salon selection change event
        const salonMenu = document.getElementById('salon-menu');
        if (salonMenu) {
            salonMenu.addEventListener('change', loadAvailableTechnicians);
        }
        
        // Date and time change events
        const timeInput = document.getElementById('time');
        
        if (dateInput) {
            dateInput.addEventListener('change', loadAvailableTechnicians);
        }
        
        if (timeInput) {
            timeInput.addEventListener('change', loadAvailableTechnicians);
        }
    });
    
    function loadSalons() {
        const salonMenu = document.getElementById('salon-menu');
        if (!salonMenu) return;
        
        // Clear existing options except the first placeholder
        while (salonMenu.options.length > 1) {
            salonMenu.remove(1);
        }
        
        const salons = [
            { id: 'salon1', name: 'Angel Nails' },
            { id: 'salon2', name: 'Ny Nails' },
            { id: 'salon3', name: 'Brooklyn Nails' }
        ];
        
        salons.forEach(salon => {
            const option = document.createElement('option');
            option.value = salon.id;
            option.textContent = salon.name;
            salonMenu.appendChild(option);
        });
    }
    
    function loadSelectedServices() {
        const servicesList = document.getElementById('services-list');
        const totalPrice = document.getElementById('booking-total-price');
        const totalDuration = document.getElementById('booking-total-duration');
        
        if (servicesList && totalPrice && totalDuration) {
            // Check if there are selected services in localStorage
            const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
            const price = localStorage.getItem('totalPrice') || '0.00';
            const duration = localStorage.getItem('totalDuration') || '0';
            
            // If no services are stored yet, display some example services
            if (services.length === 0) {
                // Example services for demonstration
                const exampleServices = [
                    { name: 'Manicure', price: 25.00, duration: 30 },
                    { name: 'Pedicure', price: 35.00, duration: 45 }
                ];
                
                servicesList.innerHTML = exampleServices.map(service => 
                    `<li>${service.name} - $${service.price.toFixed(2)} (${service.duration} min)</li>`
                ).join('');
                
                totalPrice.textContent = exampleServices.reduce((sum, service) => sum + service.price, 0).toFixed(2);
                totalDuration.textContent = exampleServices.reduce((sum, service) => sum + service.duration, 0);
            } else {
                // Display the actual selected services
                servicesList.innerHTML = services.map(service => `<li>${service.replace(/-/g, ' ')}</li>`).join('');
                totalPrice.textContent = price;
                totalDuration.textContent = duration;
            }
        }
    }
    
    function loadAvailableTechnicians() {
        const salonMenu = document.getElementById('salon-menu');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        const technicianInfo = document.querySelector('.technician-availability-info');
        const technicianOptions = document.querySelector('.technician-options');
        const availableTechnicians = document.getElementById('available-technicians');
        
        if (!salonMenu || !dateInput || !timeInput || !technicianInfo || !technicianOptions || !availableTechnicians) {
            console.error('Missing required elements for technician loading');
            return;
        }
        
        const salonId = salonMenu.value;
        const date = dateInput.value;
        const time = timeInput.value;
        
        console.log(`Loading technicians for: Salon=${salonId}, Date=${date}, Time=${time}`);
     
        if (!salonId || !date || !time) {
            technicianInfo.style.display = 'block';
            technicianOptions.style.display = 'none';
            return;
        }
        
        technicianInfo.style.display = 'none';
        technicianOptions.style.display = 'block';
        
        const technicians = [
            { id: 'tech1', name: 'Cesar' },
            { id: 'tech2', name: 'Thu' },
            { id: 'tech3', name: 'Tomoe' }
        ];
        
        availableTechnicians.innerHTML = '';
        
   
        const anyTechLabel = document.createElement('label');
        anyTechLabel.innerHTML = `
            <input type="radio" name="technician-preference" value="any" checked>
            Any available technician
        `;
        availableTechnicians.appendChild(anyTechLabel);
        availableTechnicians.appendChild(document.createElement('br'));
   
        technicians.forEach(tech => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="technician-preference" value="${tech.id}">
                ${tech.name}
            `;
            availableTechnicians.appendChild(label);
            availableTechnicians.appendChild(document.createElement('br'));
        });
    }
    
    function handleBooking(e) {
        e.preventDefault();
        console.log('Processing booking...');
        
        const salon = document.getElementById('salon-menu').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
 
        const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');

        let technicianId = 'any';
        const technicianRadios = document.querySelectorAll('input[name="technician-preference"]:checked');
        if (technicianRadios.length > 0) {
            technicianId = technicianRadios[0].value;
        }
   
        if (!salon || !date || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (services.length === 0) {
  
            const exampleServices = ['Manicure', 'Pedicure'];
            
            const bookingData = new Booking(salon, date, time, exampleServices, technicianId);
            console.log('New Booking (with example services):', bookingData);
            
            localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        } else {
            const bookingData = new Booking(salon, date, time, services, technicianId);
            console.log('New Booking:', bookingData);
            
            localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        }
   
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = 'confirmed';
        }
  
        fadeOutAndNavigate('payment.html');
    }
    
    function fadeOutAndNavigate(page) {
        console.log('Navigating to:', page);
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = page;
        }, 500);
    }
    if (dateInput) {
        dateInput.addEventListener('change', loadAvailableTechnicians);
    }
    
    if (timeInput) {
        timeInput.addEventListener('change', loadAvailableTechnicians);
    }
});

function loadSalons() {
    const salonMenu = document.getElementById('salon-menu');
    if (!salonMenu) return;
    
    // Clear existing options except the first placeholder
    while (salonMenu.options.length > 1) {
        salonMenu.remove(1);
    }
    
    const salons = [
        { id: 'salon1', name: 'Angel Nails' },
        { id: 'salon2', name: 'Ny Nails' },
        { id: 'salon3', name: 'Brooklyn Nails' }
    ];
    
    salons.forEach(salon => {
        const option = document.createElement('option');
        option.value = salon.id;
        option.textContent = salon.name;
        salonMenu.appendChild(option);
    });
}

function loadSelectedServices() {
    const servicesList = document.getElementById('services-list');
    const totalPrice = document.getElementById('booking-total-price');
    const totalDuration = document.getElementById('booking-total-duration');
    
    if (servicesList && totalPrice && totalDuration) {
        // Check if there are selected services in localStorage
        const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
        const price = localStorage.getItem('totalPrice') || '0.00';
        const duration = localStorage.getItem('totalDuration') || '0';
        
        // If no services are stored yet, display some example services
        if (services.length === 0) {
            // Example services for demonstration
            const exampleServices = [
                { name: 'Manicure', price: 25.00, duration: 30 },
                { name: 'Pedicure', price: 35.00, duration: 45 }
            ];
            
            servicesList.innerHTML = exampleServices.map(service => 
                `<li>${service.name} - $${service.price.toFixed(2)} (${service.duration} min)</li>`
            ).join('');
            
            totalPrice.textContent = exampleServices.reduce((sum, service) => sum + service.price, 0).toFixed(2);
            totalDuration.textContent = exampleServices.reduce((sum, service) => sum + service.duration, 0);
        } else {
            // Display the actual selected services
            servicesList.innerHTML = services.map(service => `<li>${service.replace(/-/g, ' ')}</li>`).join('');
            totalPrice.textContent = price;
            totalDuration.textContent = duration;
        }
    }
}

function loadAvailableTechnicians() {
    const salonMenu = document.getElementById('salon-menu');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const technicianInfo = document.querySelector('.technician-availability-info');
    const technicianOptions = document.querySelector('.technician-options');
    const availableTechnicians = document.getElementById('available-technicians');
    
    if (!salonMenu || !dateInput || !timeInput || !technicianInfo || !technicianOptions || !availableTechnicians) {
        console.error('Missing required elements for technician loading');
        return;
    }
    
    const salonId = salonMenu.value;
    const date = dateInput.value;
    const time = timeInput.value;
    
    console.log(`Loading technicians for: Salon=${salonId}, Date=${date}, Time=${time}`);
 
    if (!salonId || !date || !time) {
        technicianInfo.style.display = 'block';
        technicianOptions.style.display = 'none';
        return;
    }
    
    technicianInfo.style.display = 'none';
    technicianOptions.style.display = 'block';
    
    const technicians = [
        { id: 'tech1', name: 'Cesar' },
        { id: 'tech2', name: 'Thu' },
        { id: 'tech3', name: 'Tomoe' }
    ];
    
    availableTechnicians.innerHTML = '';
    
    // Add "Any available technician" option first
    const anyTechLabel = document.createElement('label');
    anyTechLabel.innerHTML = `
        <input type="radio" name="technician-preference" value="any" checked>
        Any available technician
    `;
    availableTechnicians.appendChild(anyTechLabel);
    availableTechnicians.appendChild(document.createElement('br'));
    
    // Add specific technicians
    technicians.forEach(tech => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="technician-preference" value="${tech.id}">
            ${tech.name}
        `;
        availableTechnicians.appendChild(label);
        availableTechnicians.appendChild(document.createElement('br'));
    });
}

function handleBooking(e) {
    e.preventDefault();
    console.log('Processing booking...');
    
    const salon = document.getElementById('salon-menu').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Get selected services from localStorage
    const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    
    // Get selected technician
    let technicianId = 'any';
    const technicianRadios = document.querySelectorAll('input[name="technician-preference"]:checked');
    if (technicianRadios.length > 0) {
        technicianId = technicianRadios[0].value;
    }
    
    // Validate form data
    if (!salon || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (services.length === 0) {
        // For demo purposes, use example services if none selected
        const exampleServices = ['Manicure', 'Pedicure'];
        
        const bookingData = new Booking(salon, date, time, exampleServices, technicianId);
        console.log('New Booking (with example services):', bookingData);
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    } else {
        const bookingData = new Booking(salon, date, time, services, technicianId);
        console.log('New Booking:', bookingData);
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    }
    
    // Update status
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = 'confirmed';
    }
    
    // Navigate to payment page
    fadeOutAndNavigate('payment.html');
}

function fadeOutAndNavigate(page) {
    console.log('Navigating to:', page);
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}