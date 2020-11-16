import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

import './Password.css'
import api from '../../api'
import { AuthContext } from '../../context/AuthContext';

const Password = () => {
    const { saveToken } = useContext(AuthContext)
    const { passwordConfig } = useParams();
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const body = {
                password, passwordConfig
            }
            const { data } = await api.post('/user/password', body)
            const token = data.token
            saveToken(token)
        } catch (error) {
            const { message } = error.response.data
            setMessageError(message)
            setTimeout(() => {
                setMessageError('')
            }, 10000)
        }
    }

    return (
        <div className="passwordContainer">
            <form className="passwordForm" onSubmit={handleSubmit}>
                <span className="titlePasswordForm">Definição da Senha</span>
                <input className="inputPasswordForm" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <button className="buttonPasswordForm" type="submit">Salvar</button>
                {messageError && <span className="messageErrorPasswordForm">{messageError}</span>}
            </form>
        </div>
    )
}

export default Password