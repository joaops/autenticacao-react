import { Router, Switch } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import history from './history'
import CustomRoute from './CustomRoute'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Tasks from './components/Tasks/Tasks'
import Register from './components/Register/Register'
import Recover from './components/Recover/Recover'
import Password from './components/Password/Password'
import User from './components/User/User'

function App() {
    return (
        <AuthProvider>
            <Router history={history}>
                <Navbar />
                <Switch>
                    <CustomRoute exact path="/" component={Home} />
                    <CustomRoute isPrivate exact path="/tasks" component={Tasks} />
                    <CustomRoute exact path="/login" component={Login} />
                    <CustomRoute exact path="/register" component={Register} />
                    <CustomRoute exact path="/recover" component={Recover} />
                    <CustomRoute exact path="/password/:passwordConfig" component={Password} />
                    <CustomRoute isPrivate exact path="/user" component={User} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
