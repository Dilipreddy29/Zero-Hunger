import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Assuming your backend runs on port 5000

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => apiService.post('/auth/register', userData);
export const loginUser = (userData) => apiService.post('/auth/login', userData);
export const registerDonor = (userData) => apiService.post('/auth/register-donor', userData);

// Donation Endpoints
export const createDonation = (donationData) => {
  return apiService.post('/donations', donationData);
};
export const getMyDonations = (token) => {
  return apiService.get('/donations/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const cancelDonation = (id, token) => {
  return apiService.post(`/donations/${id}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getDonationById = (id, token) => {
  return apiService.get(`/donations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHungerSpots = () => apiService.get('/hunger-spots');
export const createHungerSpot = (hungerSpotData, token) => {
  return apiService.post('/hunger-spots', hungerSpotData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getNearbyHungerSpots = (lat, lng) => apiService.get(`/hunger-spots/nearby?lat=${lat}&lng=${lng}`);

export const getMyTasks = (token) => {
  return apiService.get('/volunteer/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const acceptPickup = (id, token) => {
  return apiService.post(`/volunteer/donations/${id}/accept`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const markAsPickedUp = (id, token) => {
  return apiService.post(`/volunteer/donations/${id}/pickup`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const markAsDelivered = (id, token) => {
  return apiService.post(`/volunteer/donations/${id}/deliver`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// WhatsApp Endpoints
export const sendWhatsAppMessage = (messageData, token) => {
  return apiService.post('/whatsapp/send', messageData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
