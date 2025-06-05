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
    console.error("User үүсгэхэд алдаа:", error);    // urj bui user ni undefined umu null baihad
    throw error;
  }
}

export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/api/users/${id}`, user)     // development needed
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
    const response = await axios.post(`${URL}/api/auth/login`, user)
    console.log(response)
    if (response.data.success) {
        return response
    } else {
        return
    }
}
export async function saveForm(userId, formData) {
    try {
        const response = await axios.post(`${URL}/api/forms`, {
            ...formData,
            createdBy: userId,
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Тодорхойгүй алдаа';
        console.error("Error while saving:", message);
        throw new Error(message);
    }
}
export async function getForm(formId) {
    try {
        const response = await axios.get(`${URL}/api/forms/${formId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Тодорхойгүй алдаа';
        console.error("Error while fetching form:", message);
        throw new Error(message);
    }
}