import React from 'react';
import styles from './auth.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createUser } from '../../api.js';

import CreateAccount  from "./auths/createAccount.jsx";
import Login  from "./auths/login.jsx";


export default function Auth() {
  const [user, setUser] = useState({ name: "", password: "" });
  const [login, setLogin] = useState(false); // false = register, true = login

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form refresh
    let response = await createUser(user);
    if (response.status === 200) {
      console.log("User created successfully");
    } else {
      console.log("Error creating user");
    }
  }
  async function handleLogin(e) {
    e.preventDefault(); // prevent default form refresh
    let response = await axios.post("http://localhost:3000/api/login", user);
    if (response.status === 200) {
      console.log("User logged in successfully");
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home");
    } else {
      console.log("Error logging in user");
    }
  }

  return (
    <div className={styles["auth"]}> 
      {login ? (<CreateAccount/>) : (<Login/>)}
      <button
        onClick={() => setLogin(!login)}
        className={styles["auth-button"]}
        style={{ backgroundColor: "#eee", color: "#333", marginTop: "1rem" }}>
        {login ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}