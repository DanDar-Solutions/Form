import { verifyUser } from "../../../api.js"
import { useState } from "react"
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"

import Forgotpassword from "./forgotpassword.jsx"                    // component that calling

export default function Login({ setLogged, setNotification }) {

    const [forgotPassword, setForgotPassword] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [captchaToken, setCaptchaToken] = useState(null)

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
        e.preventDefault();
        
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

            // If captcha is valid, proceed with login
            let response = await verifyUser(user);
            console.log(response);
            
            if (response) {
                localStorage.setItem("User", JSON.stringify({
                    id: response.data.id,
                    name: response.data.name
                }));
                setLogged(true); //  state
                localStorage.setItem("logged", "true"); //  persistent login
                setNotification({
                    message: "Амжилттай нэвтэрлээ",
                    type: "success"
                });
            } else {
                setNotification({
                    message: "Нэвтрэх нэр эсвэл нууц үг буруу байна",
                    type: "error"
                });
            }
        } catch (error) {
            console.error("Login error:", error.message);
            setNotification({
                message: "Серверт холбогдоход алдаа гарлаа",
                type: "error"
            });
        }
    }   


    return (
        <div>
            { !forgotPassword &&
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} className="mb-2"/>
                <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} className="mb-2"/>
                <div className="mb-4">
                    <ReCAPTCHA
                        sitekey="6LeBF1QrAAAAAOZmbqeQ-HynhQHy7yGzRKeFJTf1"
                        onChange={handleCaptchaChange}
                    />
                </div>
                <button type="submit" className="mb-4" >Login</button>
                <button type="button" onClick={()=> setForgotPassword(true)} className="mb-4">Forgot Password</button>
            </form>
}
            {forgotPassword && <Forgotpassword setNotification={setNotification}/>}
        </div>
    )
}