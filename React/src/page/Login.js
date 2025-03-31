import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

export default function Login()
{
    const [ user, setUser ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate()

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: user,
            password: password,
            expiresInMins: 60
        }

        fetchLogIn(data, navigate);
    }

    return (
        <div
            className="page-container"
            style={{
                backgroundImage: 'url("/espacio.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className="containerLogin"
                style={{
                    backgroundColor: '#121418',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h3>Login</h3>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <div>
                        <input
                            onChange={handleUserChange}
                            className="login-input"
                            type="text"
                            placeholder="User"
                            name="user"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handlePasswordChange}
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </div>
                    <div className="login-button-container">
                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function fetchLogIn(data, navigate)
{
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        const hasToken = data?.accessToken !== undefined

        if(!hasToken)
        {
            alert("Usuario o credenciales incorrectas")
            return;
        }

        localStorage.setItem("token", data.accessToken)
        navigate("/products")       

    }).catch(err => {
        console.log("error", err)
    })
}