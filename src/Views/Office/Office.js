import { useEffect, useState, useRef } from 'react'
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
import Peer from 'simple-peer'

const Office = observer((props) => {
    const { officeStore, userStore, socketStore } = rootstore
    const [showCoWorkers, setShowCoWorkers] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const peerAudio = useRef()

    useEffect(() => {
        const fetchOrganization = async () => {
            await officeStore.fetchOffice(userStore.user.organization)
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {            
            const peer1 = new Peer({ initiator: true, trickle: false, stream: stream })
            
            socketStore.socket.on('callAccepted', signal => {
                console.log('accept call')
                peer1.signal(signal)
            })
    
            peer1.on('signal', data => {
                console.log('emiting signal')
                socketStore.socket.emit('startCall', data)
            })
    
            peer1.on('stream', stream => {
                console.log('stream received')
                if (peerAudio.current) {
                    peerAudio.current.srcObject = stream
                }
            })
        })

        fetchOrganization()
    }, [officeStore, userStore])

    if (!officeStore.office) {
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
            <div className="office-toggle-coworkers" onClick={() => setShowCoWorkers(!showCoWorkers)}>
                <FiUsers style={{marginRight: '3px'}} size={18}/>
                {`Co-workers (${officeStore.organization.employees.length})`}
            </div>
            <CoWorkers show={showCoWorkers} close={() => setShowCoWorkers(false)}/>
            {showSettings && <Settings setShowSettings={setShowSettings} />}
            <video playsInline ref={peerAudio} autoPlay style={{height: '0px'}}/>
        </div>
    )
})

export default Office