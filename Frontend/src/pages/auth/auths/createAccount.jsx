import React from 'react'                                    // required things
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

import { createUser } from "../../../api.js"                   // function

export default function CreateAccount({ setNotification }) {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [captchaToken, setCaptchaToken] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleCaptchaChange(token) {
    console.log("reCAPTCHA token received:", token ? "token exists" : "token is null");
    setCaptchaToken(token)
  }

  async function verifyCaptcha(token) {
    try {
      console.log("Sending captcha verification request to server");
      // Try the direct endpoint first
      const response = await axios.post("http://localhost:8000/verify-captcha", { token });
      console.log("Captcha verification response:", response.data);
      return response.data.success || response.data.message === "This is a test endpoint";
    } catch (error) {
      console.error("Captcha verification failed:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      
      // If direct endpoint fails, try the API route
      try {
        console.log("Trying alternative API endpoint");
        const response = await axios.post("http://localhost:8000/api/verify-captcha", { token });
        console.log("Alternative captcha verification response:", response.data);
        return response.data.success;
      } catch (altError) {
        console.error("Alternative captcha verification failed:", altError.message);
        return false;
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!captchaToken) {
      setNotification({
        message: "reCAPTCHA-г баталгаажуулна уу",
        type: "error"
      });
      return;
    }

    try {
      // Verify captcha first
      console.log("Verifying captcha with token");
      const isValid = await verifyCaptcha(captchaToken);
      console.log("Captcha validation result:", isValid);
      
      if (!isValid) {
        setNotification({
          message: "reCAPTCHA баталгаажуулалт амжилтгүй боллоо",
          type: "error"
        });
        return;
      }

      // If captcha is valid, proceed with account creation
      const response = await createUser(user)
      
      if (response && response._id) {
        setLogged(true)
        setNotification({
          message: "Бүртгэл амжилттай үүслээ",
          type: "success"
        });
        navigate("/create", { state: { userId: response._id } })
      } else {
        setNotification({
          message: "Бүртгэл үүсгэж чадсангүй",
          type: "error"
        });
      }

      console.log(response)
    } catch (error) {
      console.error("Account creation error:", error.message);
      setNotification({
        message: "Бүртгэл үүсгэх үед алдаа гарлаа",
        type: "error"
      });
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input placeholder={"Name"} onChange={handleChange} name="name" required maxLength={20} className="mb-2" />
        <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} className="mb-2" />
        <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} className="mb-2" />
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="6LeBF1QrAAAAAOZmbqeQ-HynhQHy7yGzRKeFJTf1"
            onChange={handleCaptchaChange}
          />
        </div>
        <button type="submit" className="mb-2">Create Account</button>
      </form>
    </div>
  )
}
