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
    
    const dateInput = document.getElementById('date');
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
        const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
        const price = localStorage.getItem('totalPrice') || '0.00';
        const duration = localStorage.getItem('totalDuration') || '0';
        
        servicesList.innerHTML = services.map(service => `<li>${service.replace(/-/g, ' ')}</li>`).join('');
        totalPrice.textContent = price;
        totalDuration.textContent = duration;
    }
}

function loadAvailableTechnicians() {
    const salonMenu = document.getElementById('salon-menu');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const technicianInfo = document.querySelector('.technician-availability-info');
    const technicianOptions = document.querySelector('.technician-options');
    const availableTechnicians = document.getElementById('available-technicians');
    
    if (!salonMenu || !dateInput || !timeInput || !technicianInfo || !technicianOptions || !availableTechnicians) return;
    
    const salonId = salonMenu.value;
    const date = dateInput.value;
    const time = timeInput.value;
    
 
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
    // available technicians
    technicians.forEach(tech => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="technician-preference" value="${tech.id}">
            ${tech.name}
        `;
        availableTechnicians.appendChild(label);
    });
}

function handleBooking(e) {
    e.preventDefault();
    const salon = document.getElementById('salon-menu').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    // selected technician
    let technicianId = 'any';
    const technicianRadios = document.querySelectorAll('input[name="technician-preference"]');
    technicianRadios.forEach(radio => {
        if (radio.checked && radio.value !== 'any') {
            technicianId = radio.value;
        }
    });
    
    if (!salon || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (services.length === 0) {
        alert('Please select at least one service before booking');
        return;
    }
    
    const bookingData = new Booking(salon, date, time, services, technicianId);
    console.log('New Booking:', bookingData);
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = 'confirmed';
    }
    
    fadeOutAndNavigate('payment.html');
}
function fadeOutAndNavigate(page) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}