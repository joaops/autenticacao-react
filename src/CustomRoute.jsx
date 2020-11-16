import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { AuthContext } from './context/AuthContext'

const CustomRoute = ({ isPrivate, ...rest }) => {
    const { authenticated } = useContext(AuthContext)

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }
    return <Route {...rest} />
}

export default CustomRoute