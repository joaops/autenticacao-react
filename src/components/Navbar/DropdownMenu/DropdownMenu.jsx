import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './DropdownMenu.css'
import api from '../../../api'
import { AuthContext } from '../../../context/AuthContext'
import { ReactComponent as MenuIcon } from '../../../icons/Menu.svg'
import useComponentVisible from '../../../hooks/useComponentVisible'

const DropdownMenu = () => {
    const { authenticated, handleLogout } = useContext(AuthContext)
    const [user, setUser] = useState({ name: '', lastname: '' })
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    useEffect(() => {
        if (authenticated) {
            api.get('/user/find')
                .then((response) => {
                    setUser(response.data)
                })
        }
    }, [authenticated])

    return (
        <div className="dropdownMenu" style={!authenticated ? { display: 'none' } : null}>
            <div className="dropdownMenuIcon" onClick={(e) => { setIsComponentVisible(true) }}>
                <MenuIcon />
            </div>
            {
                isComponentVisible &&
                <div ref={ref} className="dropdownMenuContent">
                    <Link to={'/user'} className="dropdownMenuPerfil" onClick={() => { setIsComponentVisible(false) }} style={!authenticated ? { display: 'none' } : null}>
                        <div>
                            <div style={{ fontSize: '17px', marginBottom: '10px' }}>{user.name} {user.lastname}</div>
                            <div style={{ fontSize: '15px', color: '#B0B3B8' }}>Veja o Seu Perfil</div>
                        </div>
                    </Link>
                    <div className="dropdownMenuItem" onClick={handleLogout} style={!authenticated ? { display: 'none' } : null}>
                        Sair
                    </div>
                </div>
            }
        </div>
    )
}

export default DropdownMenu