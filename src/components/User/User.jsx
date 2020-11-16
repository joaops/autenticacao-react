import React, { useContext, useEffect, useState } from 'react'

import './User.css'
import api from '../../api'
import { AuthContext } from '../../context/AuthContext'

const User = () => {
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({ _id: '', email: '', name: '', lastname: '' })
    const [checkedDeleteUser, setCheckedDeleteUser] = useState(false)
    const { authenticated, handleLogout } = useContext(AuthContext)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [deleteAccountMessageError, setDeleteAccountMessageError] = useState('')
    
    useEffect(() => {
        if (authenticated) {
            api.get('/user/find')
                .then((response) => {
                    setUser(response.data)
                })
        }
    }, [authenticated])

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const body = {
                name: user.name, lastname: user.lastname, password
            }
            const { data } = await api.put('/user', body)
            setUser(data)
            setSuccessMessage('Dados Atualizados Com Sucesso.')
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000)
        } catch (error) {
            const { message } = error.response.data
            setErrorMessage(message)
            setTimeout(() => {
                setErrorMessage('')
            }, 10000)
        }
    }

    const deleteUserAccount = async () => {
        try {
            await api.delete('/user')
            handleLogout()
        } catch (error) {
            const { message } = error.response.data
            setDeleteAccountMessageError(message)
            setTimeout(() => {
                setErrorMessage('')
            }, 10000)
        }
    }

    return (
        <div className="userContainer">
            <form className="userForm" onSubmit={handleSubmit} autoComplete="off">
                <span className="titleUserForm">Alterar Dados de Usuário</span>
                <input className="inputUserForm inputDisabledUserForm" type="email" name="email" value={user.email || ''} placeholder="E-mail" disabled={true} />
                <input className="inputUserForm" type="text" name="name" value={user.name || ''} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="Nome" />
                <input className="inputUserForm" type="text" name="lastname" value={user.lastname || ''} onChange={e => setUser({ ...user, lastname: e.target.value })} placeholder="Sobrenome" />
                <input className="inputUserForm" type="password" name="password" value={password || ''} onChange={e => setPassword(e.target.value)} placeholder="Nova Senha" />
                <button className="buttonUserForm" type="submit">Salvar</button>
                {successMessage && <span className="successMessageUserForm">{successMessage}</span>}
                {errorMessage && <span className="errorMessageUserForm">{errorMessage}</span>}
            </form>
            <div className="deleteUserContainer">
                <span className="titleDeleteUserContainer">Deletar Conta de Usuário</span>
                <p className="textDeleteUserContainer">Essa operação irá apagar permanentemente todos os dados do usuário.</p>
                <div className="checkboxDeleteUserContainer">
                    <label htmlFor="inputDeleteUser">Continuar:</label>
                    <input id="inputDeleteUser" className="checkboxDeleteUserContainer" type="checkbox" checked={checkedDeleteUser} onChange={e => setCheckedDeleteUser(!checkedDeleteUser)} />
                </div>
                <button className="buttonDeleteUserContainer" disabled={!checkedDeleteUser} onClick={deleteUserAccount}>Excluir Conta</button>
                {deleteAccountMessageError && <span className="deleteAccountMessageError">{deleteAccountMessageError}</span>}
            </div>
        </div>
    )
}

export default User