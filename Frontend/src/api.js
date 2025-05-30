import axios from "axios";

const URL = "http://localhost:8000"

export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function createUser(userData) {
  try {
    const response = await axios.post(`${URL}/api/users`, userData);
    return response.data;  // user_id and messages
  } catch (error) {
    console.error("User үүсгэхэд алдаа:", error);
    throw error;
  }
}

export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/api/users/${id}`, user)
    return response
}

export async function sendVerificationCode(email) {
    const response = await axios.post(`${URL}/api/auth/send-code`, { email });
    return response;
}

export async function verifyCode(email, code) {
    const response = await axios.post(`${URL}/api/auth/verify-code`, { email, code });
    return response;
}

export async function verifyUser(user) {
    console.log("Sending user data to backend:", user);
    console.log(response)
    const response = await axios.post(`${URL}/api/auth/login`, user)
    if (response.data.success) {
        return response
    } else {
        return
    }
}
export async function saveForm(userId, formData) {
    try {
        const response = await axios.post(`${URL}/api/users/${userId}/forms`, formData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Тодорхойгүй алдаа';
        console.error("Error while saving:", message);
        throw new Error(message);  // return error instead of null (i think)
    }
}
