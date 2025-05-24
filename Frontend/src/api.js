import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


// Function to log in a user
export async function loginUser(credentials) {
  try {
    // Use 'name' instead of 'email' for backend compatibility
    const response = await axios.post(`${API_URL}/users/login`, {
      name: credentials.email || credentials.name,
      password: credentials.password
    });
    return response.data; // Usually contains a token or user info
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
}
