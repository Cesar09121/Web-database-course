import { getCurrentUser, removeCurrentUser } from "./user.js";

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.nav-bar');

  if(getCurrentUser()) {
    navbar.innerHTML = `
      <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./contact.html">About Us</a></li>
        <li><a href="./services.html">Our Services</a></li>
        <li><a href="./booking.html">Booking Now</a></li>
        <li><a href="#" id="logout">Logout</a></li>
      </ul>
    `;
  } else {
    navbar.innerHTML = `
      <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./contact.html">Contact Us</a></li>
        <li><a href="./services.html">Our Services</a></li>
        <li><a href="./booking.html">Booking Now</a></li>
      </ul>
    `;
  }

  const logoutLink = document.getElementById("logout");
  if(logout) logout.addEventListener('click', removeCurrentUser)
});

function setupNavigationButtons() {
  const signupButton = document.querySelector('#register-button');
  if(signupButton) {
    signupButton.addEventListener('click', function(e) {
      e.preventDefault();
      fadeOutAndNavigate('register.html');
    });
  }
  const guestButton = document.querySelector('#services-button');
  if(guestButton) {
    guestButton.addEventListener('click', function(e) {
      e.preventDefault();
      fadeOutAndNavigate('services.html');
    });
  }
}
document.addEventListener('DOMContentLoaded', setupNavigationButtons);
export async function fetchData(route = '', data = {}, methodType) {
  try {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

export function fadeOutAndNavigate(url) {
  console.log('Navigating to:', url);
  
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

window.fadeOutAndNavigate = fadeOutAndNavigate;