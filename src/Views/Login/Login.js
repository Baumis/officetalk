import { useState } from 'react';
import './Login.css';

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

    const login = () => {
        if (loginType === 'user') {
            props.navigateTo('Office')
        } else {
            props.navigateTo('ControlPanel')
        }
    }

    return (
        <div className="login">
            <div className="login-title">
                Log in to OfficeTalk
            </div>
            <div className="login-card">
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
                    <div className="login-button" style={{background: loginType === 'organization' && '#F74040'}} onClick={() => login()}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;