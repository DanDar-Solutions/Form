import axios from "axios";

const URL = "http://localhost:8000"

export async function getUser(id) {
    //"http://localhost:3000/users/12345"
    const response = await axios.get(`${URL}/users/${id}`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function createUser(user) {
    const response = await axios.post(`${URL}/api/users/users`, user)
    return response
}

export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/api/users/users/${id}`, user)
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
    const response = await axios.post(`${URL}/api/users/user/login`, user)
    console.log(response)
    if (response.data.success) {
        return response.data.token
    } else {
        return
    }
}

