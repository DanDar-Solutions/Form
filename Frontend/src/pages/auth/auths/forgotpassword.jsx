import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // Имэйл рүү код илгээх
  const handleSendCode = async () => {
    if (!email.includes("@")) return alert("Email зөв оруулна уу");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/send-code", { email });
      if (res.data.success) {
        setCodeSent(true);
        setMessage("Код амжилттай илгээгдлээ. Имэйлээ шалгаарай.");
      } else {
        setMessage("Код илгээхэд алдаа гарлаа.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Сервертэй холбогдохдоо алдаа гарлаа.");
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
        setMessage("Код зөв байна. Одоо нууц үгээ шинэчилнэ үү.");
        // Энд нууц үг солих хуудас руу navigate хийж болно
      } else {
        setMessage("Код буруу байна.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Сервертэй холбогдохдоо алдаа гарлаа.");
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

      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
