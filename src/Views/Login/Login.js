import { useState } from 'react';
import './Login.css';
import { rootstore } from '../../index'

function Login(props) {
    const userStore = rootstore.userStore
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [loginType, setLoginType] = useState('user')

    const isActive = (tab) => {
        if (tab === 'user' && loginType === 'user'){
            return 'user-active'
        }
        if (tab === 'organization' && loginType === 'organization') {
            return 'organization-active'
        }
        return ''
    }

    const signIn = async () => {
        try {
            setLoading(true)
            const response = await userStore.signIn(username, password)
            props.connectSocket(response.token)
            props.navigateTo('office')
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setPassword('')
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
                        User
                    </div>
                    <div className={`login-card-tab ${isActive('organization')}`} onClick={() => setLoginType('organization')}>
                        Organization
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
                    <div className="OTButton" style={{background: loginType === 'organization' && '#F74040'}} onClick={() => signIn()}>
                        Sign in
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;