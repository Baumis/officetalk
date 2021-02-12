import './Navbar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'
import { FiSettings, FiMic, FiVolume2, FiMicOff, FiVolumeX } from 'react-icons/fi'

const Navbar = observer((props) => {
    const { userStore, socketStore, officeStore } = rootstore

    const toggleMic = () => {
        userStore.setMuted(!userStore.muted)
        socketStore.emitMuted(!userStore.muted)
    }

    const toggleVolume = () => {
        if (!userStore.silenced) {
            
            userStore.setSilenced(true)
            userStore.setMuted(true)

            socketStore.emitSilenced(true)
            socketStore.emitMuted(true)
        } else {
            userStore.setSilenced(false)
            socketStore.emitSilenced(false)
        }
    }

    const signOut = () => {
        userStore.signOut()
        socketStore.disconnectSocket()
        props.navigateTo('login')
    }

    const getCurrentRoom = () => {
        const user = officeStore.users.find(user => user.employeeId === userStore.user._id)
        if (!user) {
            return 'loading...'
        }
        const roomId = user.position.room

        if (roomId === -1) {
            return "Hallway"
        } else {
            return officeStore.office.rooms.find(room => room._id === roomId).name
        }
    }

    return (
        <div className="navbar block-shadow">
            <div className="navbar-logo">
                <img className="navbar-logo-image" src={officeStore.organization.logo}>
                </img>
                <div className="navbar-office-name">
                    {officeStore.organization.name}
                </div>
            </div>
            <div className="navbar-controls">
                <div className="navbar-controls-border"></div>
                <div className="navbar-room">
                    <div className="navbar-room-name">{getCurrentRoom()}</div>
                    <div className="navbar-room-title">current room</div>
                </div>
                <div className="navbar-voice" onClick={() => toggleMic()} >
                    {!userStore.muted ?
                        <FiMic size={22} className="navbar-voice-microphone" color={'#1CBF73'} />
                        :
                        <FiMicOff size={22} className="navbar-voice-microphone" color={'#F74040'} />
                    }
                    <div className="navbar-room-title">microphone</div>
                </div>
                <div className="navbar-voice" onClick={() => toggleVolume()}>
                    {!userStore.silenced ?
                        <FiVolume2 size={22} className="navbar-voice-volume" color={'#1CBF73'} />
                        :
                        <FiVolumeX size={22} className="navbar-voice-volume" color={'#F74040'} />
                    }
                    <div className="navbar-room-title">volume</div>
                </div>
                <div className="navbar-settings" onClick={() => props.setShowSettings(true)}>
                    <FiSettings size={22} className="navbar-settings-cog" color={'#404145'} />
                    <div className="navbar-room-title">settings</div>
                </div>
                <div className="navbar-controls-border"></div>
            </div>
            <div className="navbar-user">
                {userStore.user.name}
                <div className="navbar-user-avatar" style={{ backgroundImage: `url(${userStore.user.avatar})` }}>
                </div>
                <div className="navbar-sign-out" onClick={() => signOut()}>
                    Sign out
                </div>
            </div>
        </div>
    )
})

export default Navbar