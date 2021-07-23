import { useState } from 'react'
import './Login.css'
import { rootstore } from '../../index'
import Dots from '../Office/components/Dots/Dots'
import { AiOutlineUser, AiOutlineShop, AiOutlineLock } from 'react-icons/ai'

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
            <div className="login-card block-shadow">
                <div className="login-card-left">
                </div>
                <div className="login-card-right">
                    <div className="login-title">
                        Sign in to OfficeTalk
                    </div>
                    <div className="login-card-tabs">
                        <div className="login-card-tabs-row">
                            <div className={`login-card-tab ${isActive('user')}`} onClick={() => setLoginType('user')}>
                                <div className="login-tab-text">Employee</div>
                            </div>
                            <div className={`login-card-tab ${isActive('organization')}`} onClick={() => setLoginType('organization')}>
                                <div className="login-tab-text">Organization</div>
                            </div>
                        </div>
                        <div className="tab-slider-row">
                            <span className={`tab-slider ${loginType === 'organization' ? 'tab-slider-org': 'tab-slider-user'}`}></span>
                        </div>
                    </div>
                    <div className="login-input-row">
                        <div className="login-input-title">
                        </div>
                        <div className={`${loginType === 'organization' ? 'login-input-org' : 'login-input'}`}>
                            <AiOutlineUser style={{ fontSize: '22px', color: '#7a7d85' }} />
                            <input
                                placeholder={'Username'}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="login-input-row">
                        <div className="login-input-title">
                        </div>
                        <div className={`${loginType === 'organization' ? 'login-input-org' : 'login-input'}`}>
                            <AiOutlineLock style={{ fontSize: '22px', color: '#7a7d85' }} />
                            <input
                                placeholder={'Password'}
                                value={password}
                                type={'password'}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="login-input-row">
                        <div className="OTButton login-button" style={{ background: loginType === 'organization' && '#0466a3' }} onClick={() => signIn()}>
                            {loading ?
                                <Dots white />
                                :
                                `Sign in`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;