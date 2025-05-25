import { sendEmail } from "../utils/sendEmail.js"

let verificationCodes = {}

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000

  verificationCodes[email] = { code, expiresAt }

  try {
    await sendEmail(email, "Password Reset Code", `Your code: ${code}`)
    res.json({ success: true, message: "Code sent to email." })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Email sending failed." })
  }
}

export const verifyCode = (req, res) => {
  const { email, code } = req.body
  const record = verificationCodes[email]

  if (!record) {
    return res.status(400).json({ success: false, message: "No code sent." })
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "Code expired." })
  }

  if (record.code !== code) {
    return res.status(400).json({ success: false, message: "Incorrect code." })
  }

  delete verificationCodes[email]
  res.json({ success: true, message: "Code verified." })
}
