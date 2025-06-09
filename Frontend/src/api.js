import axios from "axios";

const URL = "http://localhost:8000"

export async function getUser(id) {
    try {
        const response = await axios.get(`${URL}/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Хэрэглэгчийн мэдээлэл татаж чадсангүй:", error.message);
        return null;
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
            createdBy: userId,
            ...formData,
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
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Тодорхойгүй алдаа';
        console.error("Error while fetching form:", message);
        throw new Error(message);
    }
}
export async function deleteForm(formId) {
  try{
    const response = await axios.delete(`${URL}/api/forms/${formId}`)
    return response.data
  }catch(error){
    console.error("Error while Deleting form:", message);
    throw new Error(message);
  }
}
export async function getForms(userId) {
  if (!userId) throw new Error("User not found");
    return axios.get(`${URL}/api/forms`, {
    params: { userId }
  });
}

export async function submitFormResponse(formId, responses) {
  try {
    const response = await axios.post(`${URL}/api/forms/${formId}/responses`, responses);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Хариултыг хадгалахад алдаа гарлаа';
    console.error("Error while submitting response:", message);
    throw new Error(message);
  }
}