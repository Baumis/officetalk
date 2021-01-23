import { useEffect } from 'react';
import './Office.css';
import { observer } from 'mobx-react'
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'
import Rooms from './components/rooms/Rooms'
import { rootstore } from '../../index'
import Loading from './components/Loading/Loading';

const Office = observer((props) => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore
    useEffect(() => {
        fetchOrganization()
    })

    const fetchOrganization = async () => {
        await officeStore.getOrganization(userStore.user.organization)
    }

    if (!officeStore.organization) {
        return <Loading />
    }

    return (
        <div className="office">
            <Navbar />
            <div className="office-body">
                <Chat />
                <Rooms />
            </div>
        </div>
    )
})

export default Office