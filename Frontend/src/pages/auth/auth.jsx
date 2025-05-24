import './auth.css';
import { useState } from "react"

function Auth() {
    const [login, setLogin] = useState(true)


    return (
        <div className="auth">

            {login && <div>
                <h1> login </h1>
                <input type="text" placeholder='email'/>
                <input type="text" placeholder='password'/>
                <button>submit</button>
                <button onClick={() =>setLogin(false)}>sign up</button>
            </div>}
            {!login && <div>
                <h1> sign up </h1>
                <input type="text" placeholder='email'/>
                <input type="text" placeholder='password'/>
                <button>submit</button>
                <button onClick = {()=>setLogin(true)}>login</button>
            </div>}
        
        </div>
    );
}

export default Auth;