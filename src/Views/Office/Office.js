import { useEffect, useState } from 'react'
import './Office.css'
import { observer } from 'mobx-react'
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'
import Rooms from './components/rooms/Rooms'
import { rootstore } from '../../index'
import Loading from './components/Loading/Loading'
import CoWorkers from './components/CoWorkers/CoWorkers'
import Settings from './components/Settings/Settings'
import { FiUsers } from 'react-icons/fi'
import Player from 'react-player'

const Office = observer((props) => {
    const { officeStore, userStore, mediaStore } = rootstore
    const [showCoWorkers, setShowCoWorkers] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    let pushDuration = null

    useEffect(() => {
        const { ipcRenderer } = window.require('electron')
        ipcRenderer.send('PTKey', userStore.user.PTKey)

        const initializeOffice = async () => {
            await officeStore.fetchOffice(userStore.user.organization)
            if (userStore.user.pushToTalk) {
                mediaStore.PTDeactive()
            }
        }

        ipcRenderer.on('PT', () => {
            if (pushDuration) {
                clearTimeout(pushDuration)
            }

            mediaStore.PTActive()
            pushDuration = setTimeout(() => mediaStore.PTDeactive(), 500)
        })

        initializeOffice()
    }, [officeStore, userStore])

    if (!officeStore.organization) {
        return <Loading />
    }

    return (
        <div className="office">
            <Navbar
                navigateTo={props.navigateTo}
                setShowSettings={setShowSettings}
            />
            <div className="office-body">
                <Chat />
                <div className="office-body-scrollable">
                    <Rooms />
                </div>
            </div>
            <div className="office-toggle-coworkers block-shadow" onClick={() => setShowCoWorkers(!showCoWorkers)}>
                <FiUsers style={{ marginRight: '3px' }} size={18} />
                {`Co-workers`}
            </div>
            <CoWorkers show={showCoWorkers} close={() => setShowCoWorkers(false)} />
            {showSettings && <Settings setShowSettings={setShowSettings} />}
            {mediaStore.peerAudios.map(peerAudio =>
                <Player
                    playsInline
                    url={peerAudio.stream}
                    playing={true}
                    style={{ height: '0px' }}
                    height={'0px'}
                    width={'0px'}
                    volume={userStore.silenced ? 0 : 1}
                />
            )}
        </div>
    )
})

export default Office