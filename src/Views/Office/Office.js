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
    let timePushed = null

    useEffect(() => {
        const { ipcRenderer } = window.require('electron')

        const initializeOffice = async () => {
            await officeStore.fetchOffice(userStore.user.organization)
            if (userStore.user.pushToTalk) {
                mediaStore.PTDeactive()
            }
        }
        const PTPressListener = (event) => {
            if (event.code == userStore.user.PTKey) {
                mediaStore.PTActive()
            }
        }

        const PTReleaseListener = (event) => {
            if (event.code == userStore.user.PTKey) {
                mediaStore.PTDeactive()
            }
        }

        ipcRenderer.on('PT', () => {
            if (timePushed) {
                mediaStore.PTActive()
                clearTimeout(timePushed)
                timePushed = setTimeout(() => mediaStore.PTDeactive(), 500)
            } else {
                mediaStore.PTActive()
                timePushed = setTimeout(() => mediaStore.PTDeactive(), 500)
            }
        })

        initializeOffice()
        document.addEventListener('keydown', PTPressListener)
        document.addEventListener('keyup', PTReleaseListener)

        return function cleanup() {
            document.removeEventListener('keydown', PTPressListener)
            document.removeEventListener('keyup', PTReleaseListener)
        }
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