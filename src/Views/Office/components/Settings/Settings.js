import './Settings.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'
import { FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import Dots from '../Dots/Dots'

const Settings = observer((props) => {
    const userStore = rootstore.userStore
    const officeStore = rootstore.officeStore
    const [background, setBackground] = useState('transparent')
    const [unsaved, setUnsaved] = useState(false)
    const [user, setUser] = useState(JSON.parse(JSON.stringify(userStore.user)))
    const [saveing, setSaveing] = useState(false)

    useEffect(() => {
        setBackground('rgba(64, 65, 69, 0.5)')
    }, [])

    const changeValue = (property, event) => {
        if (!unsaved) {
            setUnsaved(true)
        }
        setUser({ ...user, [property]: event.target.value })
    }

    const save = async () => {
        if (!unsaved) return

        setSaveing(true)
        const response = await userStore.updateUser(user)
        setSaveing(false)

        if (response) {
            setUnsaved(false)
        } else {
            alert('could not save user')
        }
    }

    return (
        <div className="settings-background" style={{ background: background }}>
            <div className="settings-modal block-shadow">
                <div className="settings-top-row">
                    <FiX size={25} style={{ margin: '10px', cursor: 'pointer' }} color={'#404145'} onClick={() => props.setShowSettings(false)} />
                </div>
                <div className="settings-content">
                    <div className="settings-content-row">
                        <div className="settings-avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                    </div>
                    <div className="settings-content-row">
                        <div className="settings-input-row">
                            <div className="settings-input-label">Avatar url</div>
                            <input
                                value={user.avatar}
                                onChange={(event) => changeValue('avatar', event)}
                            />
                        </div>
                    </div>
                    <div className="settings-content-row">
                        <div className="settings-input-row">
                            <div className="settings-input-label">Name</div>
                            <input
                                value={user.name}
                                onChange={(event) => changeValue('name', event)}
                            />
                        </div>
                    </div>
                </div>
                <div className="settings-bottom-row">
                    <div className={`settings-save-button ${unsaved && 'unsaved-changes'}`} onClick={() => save()}>
                        {saveing ?
                            <Dots white />
                            :
                            'Save'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Settings