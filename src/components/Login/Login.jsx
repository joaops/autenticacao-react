import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import './Login.css'
import { AuthContext } from '../../context/AuthContext'
import api from '../../api'

const Login = () => {
    const { authenticated, saveToken } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')

    if (authenticated) {
        return <Redirect to="/" />
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const body = { email, password }
            const { data } = await api.post('/user/login', body)
            const token = data.token
            saveToken(token)
        } catch (error) {
            const { message } = error.response.data
            setMessageError(message)
            setTimeout(() => {
                setMessageError('')
            }, 4000)
        }
    }

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit} className="loginForm">
                <span className="titleLoginForm">Login</span>
                <input className="inputLoginForm" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                <input className="inputLoginForm" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <button className="buttonLoginForm" type="submit">Entrar</button>
                <Link to={'/recover'} className='linkLoginForm'>Esqueceu a senha?</Link>
                {messageError && <span className="errorMessageLoginForm">{messageError}</span>}
            </form>
        </div>
    )
}

export default Login