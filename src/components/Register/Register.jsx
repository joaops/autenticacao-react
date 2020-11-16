import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import './Registro.css'
import api from '../../api'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
    const { authenticated } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [success, setSuccess] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [sendingData, setSendingData] = useState({ sending: false, message: 'Registrar' })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const body = {
                email, name, lastname
            }
            setSendingData({ sending: true, message: 'Registrando...' })
            const { data } = await api.post('/user/register', body)
            setSendingData({ sending: false, message: 'Registrar' })
            const user = data
            // se o usuário foi criado
            if (user) {
                // limpar os campos
                setEmail('')
                setName('')
                setLastname('')
                // mostrar a mensagem de usuário criado
                setSuccess(true)
            }
        } catch (error) {
            const { message } = error.response.data
            setMessageError(message)
            setSendingData({ sending: false, message: 'Registrar' })
            setTimeout(() => {
                setMessageError('')
            }, 10000)
        }
    }

    if (authenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="registerContainer">
            {
                !success &&
                <form className="registerForm" onSubmit={handleSubmit}>
                    <span className="titleRegisterForm">Registro de Usuário</span>
                    <input className="inputRegisterForm" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                    <input className="inputRegisterForm" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
                    <input className="inputRegisterForm" type="text" value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Sobrenome" />
                    <button className="buttonRegisterForm" type="submit" disabled={sendingData.sending}>{sendingData.message}</button>
                    {messageError && <span className="messageErrorRegisterForm">{messageError}</span>}
                </form>
            }
            {
                success &&
                <div className="registerForm">
                    <span className="titleRegisterForm">Usuário Cadastrado Com Sucesso</span>
                    <span className="messageSuccessRegisterForm">Verifique a caixa de entrada do seu endereço de e-mail e clique no link para definir uma senha.</span>
                </div>
            }
        </div>
    )
}

export default Register