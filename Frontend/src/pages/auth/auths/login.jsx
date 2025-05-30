import { verifyUser } from "../../../api.js"
import { useState } from "react"
import axios from "axios"
import Forgotpassword from "./forgotpassword.jsx"

export default function Login({ setLogged, setNotification }) {

    const [forgotPassword, setForgotPassword] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await verifyUser(user);
            console.log(response);
            

            if (response) {
                sessionStorage.setItem("User", JSON.stringify({
                    id: response.data.id,   // '68383ba5ebb6b73ee351562a'
                    name: response.data.name // 'admin123'
                }));
                setLogged(true); //  state
                localStorage.setItem("logged", "true"); //  persistent login
                setNotification({
                    message: "Амжилттай нэвтэрлээ",
                    type: "success"
                });
            } else {
                setNotification({
                    message: "Нэвтрэх нэр эсвэл нууц үг буруу байна",
                    type: "error"
                });
            }
        } catch (error) {
            setNotification({
                message: "Серверт холбогдоход алдаа гарлаа",
                type: "error"
            });
        }
    }   


    return (
        <div>
            { !forgotPassword &&
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} className="mb-2"/>
                <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} className="mb-2"/>
                <button type="submit" className="mb-4" >Login</button>
                <button type="button" onClick={()=> setForgotPassword(true)} className="mb-4">Forgot Password</button>
            </form>
}
            {forgotPassword && <Forgotpassword setNotification={setNotification}/>}
        </div>
    )
}