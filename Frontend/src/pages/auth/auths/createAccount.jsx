import React from 'react'
import { createUser } from "../../../api.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateAccount({ setNotification }) {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
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
        <button type="submit" className="mb-2">Create Account</button>
      </form>
    </div>
  )
}
