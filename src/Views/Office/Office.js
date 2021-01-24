import { useEffect, useState } from 'react';
import './Office.css';
import { observer } from 'mobx-react'
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'
import Rooms from './components/rooms/Rooms'
import { rootstore } from '../../index'
import Loading from './components/Loading/Loading';

const Office = observer(() => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrganization = async () => {
            setLoading(true)
            await officeStore.fetchOffice(userStore.user.organization)
            setLoading(false)
        }
        fetchOrganization()
    },[officeStore, userStore])

    console.log(loading)

    if (!officeStore.office) {
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