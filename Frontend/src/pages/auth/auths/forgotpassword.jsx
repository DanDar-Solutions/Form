import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword({ setNotification }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  // Имэйл рүү код илгээх
  const handleSendCode = async () => {
    if (!email.includes("@")) {
      setNotification({
        message: "И-мэйл хаяг буруу байна",
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

  // Код шалгах
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
        // Энд нууц үг солих хуудас руу navigate хийж болно
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
    <div className="p-4">
      <h1 className="text-xl mb-2">Нууц үг сэргээх</h1>

      {!codeSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="И-мэйл хаяг"
            className="border p-1 mb-2"
          />
          <br />
          <button onClick={handleSendCode} className="bg-blue-500 text-white p-1 px-4">
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
            className="border p-1 mb-2"
          />
          <br />
          <button onClick={handleVerifyCode} className="bg-green-500 text-white p-1 px-4">
            Код шалгах
          </button>
        </>
      )}
    </div>
  );
}
