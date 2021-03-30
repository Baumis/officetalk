import { useState } from 'react'
import './Login.css'
import { rootstore } from '../../index'
import Dots from '../Office/components/Dots/Dots'
import { AiOutlineUser, AiOutlineShop } from 'react-icons/ai'

function Login(props) {
    const { userStore, socketStore, organizationStore } = rootstore
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [loginType, setLoginType] = useState('user')

    const isActive = (tab) => {
        if (tab === 'user' && loginType === 'user') {
            return 'user-active'
        }
        if (tab === 'organization' && loginType === 'organization') {
            return 'organization-active'
        }
        return ''
    }

    const signIn = async () => {
        if (username === '' || password === '') {
            alert('username and password required')
            return
        }

        loginType === 'organization' ? signInOrganization() : signInUser()
    }

    const signInUser = async () => {
        try {
            setLoading(true)
            const response = await userStore.signIn(username, password)
            socketStore.connectToOffice(response.token, response.user.organization)
            props.navigateTo('office')
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setPassword('')
            alert('could not signin')
            console.log(error)
        }
    }

    const signInOrganization = async () => {
        try {
            setLoading(true)
            await organizationStore.signIn(username, password)
            props.navigateTo('controlPanel')
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setPassword('')
            alert('could not signin')
            console.log(error)
        }
    }

    return (
        <div className="login">
            <div className="login-title">
                Sign in to OfficeTalk
            </div>
            <div className="login-card block-shadow">
                <div className="login-card-tabs">
                    <div className={`login-card-tab ${isActive('user')}`} onClick={() => setLoginType('user')}>
                        <AiOutlineUser size={20} />
                        <div className="login-tab-text">User</div>
                    </div>
                    <div className={`login-card-tab ${isActive('organization')}`} onClick={() => setLoginType('organization')}>
                        <AiOutlineShop size={20} />
                        <div className="login-tab-text">Organization</div>
                    </div>
                </div>
                <div className="login-input-row">
                    <div className="login-input-title">
                    </div>
                    <input
                        placeholder={'Email'}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="login-input-row">
                    <div className="login-input-title">
                    </div>
                    <input
                        placeholder={'Password'}
                        value={password}
                        type={'password'}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="login-input-row">
                    <div className="OTButton" style={{ background: loginType === 'organization' && '#F74040' }} onClick={() => signIn()}>
                        {loading ?
                            <Dots white />
                            :
                            `Sign in`
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;