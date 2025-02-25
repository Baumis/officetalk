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

    useEffect(() => {
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

        const PTPressMouseListener = (event) => {
            if (event.button == userStore.user.PTKey) {
                mediaStore.PTActive()
            }
        }

        const PTReleaseMouseListener = (event) => {
            if (event.button == userStore.user.PTKey) {
                mediaStore.PTDeactive()
            }
        }

        initializeOffice()
        document.addEventListener('keydown', PTPressListener)
        document.addEventListener('keyup', PTReleaseListener)
        document.addEventListener('mousedown', PTPressMouseListener)
        document.addEventListener('mouseup', PTReleaseMouseListener)

        return function cleanup() {
            document.removeEventListener('keydown', PTPressListener)
            document.removeEventListener('keyup', PTReleaseListener)
            document.removeEventListener('mousedown', PTPressMouseListener)
            document.removeEventListener('mouseup', PTReleaseMouseListener)
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