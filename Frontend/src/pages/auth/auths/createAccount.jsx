import React from 'react'
import { createUser } from "../../../api.js"
import { useState} from "react"

export default function CreateAccount() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user)
        console.log(response)
        if (response.status !== 200) {
            alert("User account could not be created :(")
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input placeholder={"Name"} onChange={handleChange} name="name" required maxLength={20} className="mb-2"/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} className="mb-2"/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} className="mb-2"/>
            <button type="submit" className="mb-2">Create Account</button>
        </form>
    </div>
  )
}
