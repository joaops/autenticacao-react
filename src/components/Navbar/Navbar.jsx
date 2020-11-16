import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import { AuthContext } from '../../context/AuthContext'
import DropdownMenu from './DropdownMenu/DropdownMenu'

const Navbar = () => {
    const { authenticated } = useContext(AuthContext)
    
    return (
        <div>
            <div className="navbar">
                <Link to={'/'} className="navbarLink">
                    Home
                </Link>
                <Link to={'/tasks'} className="navbarLink" style={!authenticated ? { display: 'none' } : null}>
                    Tasks
                </Link>
                <Link to={'/login'} className="navbarLink" style={authenticated ? { display: 'none' } : null}>
                    Login
                </Link>
                <Link to={'/register'} className="navbarLink" style={authenticated ? { display: 'none' } : null}>
                    Register
                </Link>
                <DropdownMenu />
            </div>
        </div>
    )
}

export default Navbar