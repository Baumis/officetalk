import './Settings.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'
import { FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const Settings = observer((props) => {
    const userStore = rootstore.userStore
    const officeStore = rootstore.officeStore
    const [background, setBackground] = useState('transparent')

    useEffect(() => {
        setBackground('rgba(64, 65, 69, 0.5)')
    },[])

    return (
        <div className="settings-background" style={{background: background}}>
            <div className="settings-modal block-shadow">
                <div className="settings-top-row">
                    <FiX size={25} style={{margin: '10px', cursor: 'pointer'}} color={'#404145'} onClick={() => props.setShowSettings(false)}/>
                </div>
                <div className="settings-content">

                </div>
                <div className="settings-bottom-row">
                </div>
            </div>
        </div>
    )
})

export default Settings