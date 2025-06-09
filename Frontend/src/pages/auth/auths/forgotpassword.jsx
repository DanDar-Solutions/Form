import React, { useState } from "react";
import axios from "axios";
import "./css/forgotPassword.css";
import ReCAPTCHA from "react-google-recaptcha";
import { sendVerificationCode, verifyCode, verifyCaptcha } from "../../../api";

export default function ForgotPassword({ setNotification }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCaptchaChange = (token) => {
    console.log("Received reCAPTCHA token:", token);
    setCaptchaToken(token);
  };

  const handleSendCode = async () => {
  if (!isValidEmail(email)) {
  setNotification({
    message: "И-мэйл хаяг буруу байна",
    type: "error"
  });
  return;
}

  if (!captchaToken) {
    setNotification({
      message: "Та reCAPTCHA-г баталгаажуулна уу",
      type: "error"
    });
    return;
  }

  try {
    const verifyRes = await verifyCaptcha(captchaToken);
    if (!verifyRes) {
      setNotification({
        message: "reCAPTCHA шалгалт амжилтгүй боллоо",
        type: "error"
      });
      return;
    }
  } catch (err) {
    console.error("CAPTCHA verification error:", err);
    setNotification({
      message: "reCAPTCHA баталгаажуулах үед алдаа гарлаа",
      type: "error"
    });
    return;
  }

  try {
    const res = await sendVerificationCode(email);
    if (res.data.success) {
      setCodeSent(true);
      setNotification({
        message: "Код амжилттай илгээгдлээ. Имэйлээ шалгаарай.",
        type: "success"
      });
    } else {
      setNotification({
        message: "Код илгээхэд алдаа гарлаа",
        type: "error"
      });
    }
  } catch (err) {
    console.error(err);
    setNotification({
      message: "Сервертэй холбогдоход алдаа гарлаа",
      type: "error"
    });
  }
};

const handleVerifyCode = async () => {
  try {
    const res = await verifyCode(email, code);
    if (res.data.success) {
      setNotification({
        message: "Код зөв байна. Одоо нууц үгээ шинэчилнэ үү.",
        type: "success"
      });
      // router navigate here if needed
    } else {
      setNotification({
        message: "Код буруу байна",
        type: "error"
      });
    }
  } catch (err) {
    console.error(err);
    setNotification({
      message: "Сервертэй холбогдоход алдаа гарлаа",
      type: "error"
    });
  }
};


  return (
    <div className="reset-container">
      <h1 className="reset-title">Нууц үг сэргээх</h1>

      {!codeSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="И-мэйл хаяг"
            className="reset-input"
          />
          <div className="captcha-box">
            <ReCAPTCHA
              sitekey="6LeBF1QrAAAAAOZmbqeQ-HynhQHy7yGzRKeFJTf1"
              onChange={handleCaptchaChange}
            />
          </div>
          <button onClick={handleSendCode} className="send-code-button">
            Код илгээх
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6 оронтой код оруулна уу"
            className="reset-input"
          />
          <button onClick={handleVerifyCode} className="verify-code-button">
            Код шалгах
          </button>
        </>
      )}
    </div>
  );
}
