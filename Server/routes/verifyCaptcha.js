import express from "express";
import axios from "axios";
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/api/verify-captcha", async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token is missing" });
  }

  try {
    // Google requires data to be sent as form data, not as JSON
    const params = new URLSearchParams();
    params.append('secret', SECRET_KEY);
    params.append('response', token);

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log("reCAPTCHA verification response:", response.data);

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: response.data["error-codes"] });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error.message);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

export default router;
