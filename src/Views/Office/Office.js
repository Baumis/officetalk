import { useEffect, useState } from 'react'
import './Office.css';
import { observer } from 'mobx-react'
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'
import Rooms from './components/rooms/Rooms'
import { rootstore } from '../../index'
import Loading from './components/Loading/Loading'
import CoWorkers from './components/CoWorkers/CoWorkers'

const Office = observer((props) => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore
    const [showCoWorkers, setShowCoWorkers] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrganization = async () => {
            setLoading(true)
            await officeStore.fetchOffice(userStore.user.organization)
            setLoading(false)
        }
        fetchOrganization()
    }, [officeStore, userStore])

    if (!officeStore.office) {
        return <Loading />
    }

    return (
        <div className="office">
            <Navbar
                navigateTo={props.navigateTo}
            />
            <div className="office-body">
                <Chat />
                <div className="office-body-scrollable">
                    <Rooms />
                </div>
            </div>
            <div className="office-toggle-coworkers" onClick={() => setShowCoWorkers(!showCoWorkers)}>
                {`co-workers (${officeStore.organization.employees.length})`}
            </div>
            <CoWorkers show={showCoWorkers} close={() => setShowCoWorkers(false)}/>
        </div>
    )
})

export default Office