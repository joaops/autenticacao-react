import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import './Recover.css'
import api from '../../api'
import { AuthContext } from '../../context/AuthContext'

const Recover = () => {
    const { authenticated } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [messageError, setMessageError] = useState('')
    const [success, setSuccess] = useState(false)
    const [sendingData, setSendingData] = useState({ sending: false, message: 'Enviar' })

    if (authenticated) {
        return <Redirect to="/" />
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const body = {
                email
            }
            setSendingData({ sending: true, message: 'Enviando...' })
            await api.post('/user/recover', body)
            setSendingData({ sending: false, message: 'Enviar' })
            setSuccess(true)
        } catch (error) {
            const { message } = error.response.data
            setMessageError(message)
            setSendingData({ sending: false, message: 'Enviar' })
            setTimeout(() => {
                setMessageError('')
            }, 10000)
        }
    }

    return (
        <div className="recoverContainer">
            {
                !success &&
                <form className="recoverForm" onSubmit={handleSubmit}>
                    <span className="titleRecoverForm">Recuperar Senha</span>
                    <input className="inputRecoverForm" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                    <button className="buttonRecoverForm" type="submit" disabled={sendingData.sending}>{sendingData.message}</button>
                    {messageError && <span className="messageErrorRecoverForm">{messageError}</span>}
                </form>
            }
            {
                success &&
                <div className="recoverForm">
                    <span className="titleRecoverForm">Recuperar Senha</span>
                    <span className="messageSuccessRecoverForm">Verifique a caixa de entrada do seu endereço de e-mail e clique no link para definir uma senha.</span>
                </div>
            }
        </div>
    )
}

export default Recover