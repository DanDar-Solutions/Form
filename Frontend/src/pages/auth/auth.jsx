import styles from './auth.module.css';
import { useState, useEffect } from 'react';
import Account from "./auths/account.jsx"

import CreateAccount  from "./auths/createAccount.jsx";
import Login  from "./auths/login.jsx";


export default function Auth({ setLogged, logged }) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("logged") === "true";
    if (isLogged) {
      setLogged(true); // localStorage дээр хадгалагдсан утгаар сэргээж байна
    }
  }, [setLogged]);

  if (logged) {
    return <Account />;
  }

  return (
    <div className={styles["auth"]}>
      {login ? <CreateAccount /> : <Login setLogged={setLogged} />}
      <button
        onClick={() => setLogin(!login)}
        className={styles["auth-button"]}
        style={{ backgroundColor: "#eee", color: "#333", marginTop: "1rem" }}
      >
        {login ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}