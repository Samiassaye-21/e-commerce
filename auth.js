// Base URL for backend (Node.js server)
const API_BASE_URL = 'http://localhost:5000/api';

// ========== AUTH FUNCTIONS ========== //

// Register user (connects to backend)
async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const { token, user } = await response.json();
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert('Registration successful!');
    window.location.href = 'index.html';
  } catch (error) {
    alert(error.message);
  }
}

// Login user (connects to backend)
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const { token, user } = await response.json();
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert('Login successful!');
    window.location.href = 'index.html';
  } catch (error) {
    alert(error.message);
  }
}

// Logout (unchanged)
function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Check login status (unchanged)
function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

// Get current user (unchanged)
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Update UI (unchanged)
function updateAuthUI() {
  const authLinks = document.querySelectorAll('#auth-link');
  
  authLinks.forEach(link => {
    if (isLoggedIn()) {
      const user = getCurrentUser();
      link.innerHTML = `<a href="#" id="logout-link">Logout (${user.name})</a>`;
      document.getElementById('logout-link').addEventListener('click', logoutUser);
    } else {
      link.innerHTML = '<a href="login.html">Login/Register</a>';
    }
  });
}

// Initialize on page load (unchanged)
document.addEventListener('DOMContentLoaded', updateAuthUI);