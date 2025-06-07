import React, { useState } from "react";
import axios from "axios";
import "./css/forgotPassword.css";
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPassword({ setNotification }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [isHuman, setIsHuman] = useState(false); // reCAPTCHA-ын шалгалт

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      setNotification({
        message: "И-мэйл хаяг буруу байна",
        type: "error"
      });
      return;
    }

    if (!isHuman) {
      setNotification({
        message: "Та reCAPTCHA-г баталгаажуулна уу",
        type: "error"
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/auth/send-code", { email });
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
      const res = await axios.post("http://localhost:8000/api/auth/verify-code", {
        email: email,
        code: code,
      });

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
              onChange={() => setIsHuman(true)} // Зөвхөн хүнийг батлах
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
