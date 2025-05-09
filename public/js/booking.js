const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function() {

    displaySelectedServices();
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    const dateInput = document.getElementById('date');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    const confirmButton = document.querySelector('button[type="submit"]');
    if (confirmButton) {
        confirmButton.addEventListener('click', handleBookingSubmit);
    }
});

function displaySelectedServices() {
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    const servicesList = document.getElementById('services-list');
    const totalPriceElement = document.getElementById('booking-total-price');
    const totalDurationElement = document.getElementById('booking-total-duration');
    
    if (!servicesList || !totalPriceElement || !totalDurationElement) return;
    
    if (selectedServices.length === 0) {
        servicesList.innerHTML = '<li>No services selected. <a href="services.html">Select services</a></li>';
        return;
    }
    let totalPrice = 0;
    let totalDuration = 0;
    
    servicesList.innerHTML = '';
    
    selectedServices.forEach(service => {
        const listItem = document.createElement('li');
        listItem.textContent = `${service.name} - $${parseFloat(service.price).toFixed(2)} (${service.duration} min)`;
        servicesList.appendChild(listItem);
        
        totalPrice += parseFloat(service.price);
        totalDuration += parseInt(service.duration);
    });
    
    if (totalPriceElement) totalPriceElement.textContent = totalPrice.toFixed(2);
    if (totalDurationElement) totalDurationElement.textContent = totalDuration;
    
    sessionStorage.setItem('totalPrice', totalPrice.toFixed(2));
    sessionStorage.setItem('totalDuration', totalDuration);
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    console.log('Booking form submitted');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    if (!currentUser) {
        alert('Please log in to book an appointment');
        window.location.href = 'index.html';
        return;
    }
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    if (!dateInput || !timeInput) {
        console.error('Date or time inputs not found');
        alert('Please ensure date and time are selected');
        return;
    }
    const date = dateInput.value;
    const time = timeInput.value;
    
    if (!date || !time) {
        alert('Please select a date and time');
        return;
    }
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    if (selectedServices.length === 0) {
        alert('Please select at least one service');
        window.location.href = 'services.html';
        return;
    }
    try {
        const dateTime = `${date}T${time}:00`;
        const formattedServices = selectedServices.map(s => ({
            service_id: parseInt(s.id),
            price: parseFloat(s.price)  
        }));
        console.log('Sending services:', formattedServices); 
        const response = await fetch(`${API_URL}/booking/createBooking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            user_id: parseInt(currentUser.user_id), 
            salon_id: 1,
            date_and_time: dateTime,
            status: 'pending',
            service_ids: formattedServices.map(s => s.service_id),
            })
        });
        const result = await response.json();
        
        if (response.ok) {
            alert('Booking created successfully! Proceeding to payment.');
            localStorage.setItem('currentBookingId', result.booking_id);
            window.location.href = 'payment.html';
        } else {
            throw new Error(result.message || 'Error creating booking');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('There was an error creating your booking. Please try again.');
    }
}
window.fadeOutAndNavigate = function(url) {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = url; }, 500);
}