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
        const fetchOrganization = async () => {
            await officeStore.fetchOffice(userStore.user.organization)
        }
        fetchOrganization()
    }, [officeStore, userStore])

    if (!officeStore.office) {
        return <Loading />
    }

    console.log('peerAudios in mediaStore:', mediaStore.peerAudios)
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
            <div className="office-toggle-coworkers" onClick={() => setShowCoWorkers(!showCoWorkers)}>
                <FiUsers style={{ marginRight: '3px' }} size={18} />
                {`Co-workers (${officeStore.organization.employees.length})`}
            </div>
            <CoWorkers show={showCoWorkers} close={() => setShowCoWorkers(false)} />
            {showSettings && <Settings setShowSettings={setShowSettings} />}
            {mediaStore.peerAudios.map(peerAudio => {
                <Player playsInline url={peerAudio.stream} playing={true} style={{ height: '0px' }} height={'0px'} width={'0px'} />
            })}
        </div>
    )
})

export default Office