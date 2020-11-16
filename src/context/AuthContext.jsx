import React, { createContext, useEffect, useState } from 'react'

import api from '../api'
import history from '../history'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticated(true)
        }
        setLoading(false)
    }, [])

    function saveToken (token) {
        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setAuthenticated(true)
        history.push('/')
    }

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/login')
    }

    if (loading) {
        const centerStyle = {
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
        }
        return (
            <div style={centerStyle}>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ authenticated, saveToken, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }