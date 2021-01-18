import { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login">
            <div className="login-title">
                Welcome to OfficeTalk
        </div>
            <div className="login-card">
                <div className="login-card-title">
                    Login
                </div>
                <div className="login-input-row">
                    <div className="login-input-title">
                    </div>
                    <input
                        placeholder={'Username'}
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
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;