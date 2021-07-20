import './OfficeEditor.css'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'
import RoomModel from './Room/RoomModel'
import HallwayModel from './Hallway/HallwayModel'

const OfficeEditor = observer((props) => {
    const { organizationStore } = rootstore
    const [organization, setOrganization] = useState(JSON.parse(JSON.stringify(organizationStore.organization)))

    const addRoom = () => {
        const rooms = [ ...organization.rooms, { name: "new room", capacity: 10 }]
        setOrganization({ ...organization, rooms: rooms })
    }

    return (
        <div className="office-editor">
            <div className="add-room block-shadow" onClick={() => addRoom()}>Add Room</div>
            <div className="rooms" id="rooms">
                <div className="rooms-row">
                    {organization.rooms.map((room, index) => {
                        if (index % 2 === 0) {
                            return (
                                <RoomModel
                                    room={room}
                                    first={index === 0}
                                />
                            )
                        } return null
                    })}
                </div>
                <HallwayModel />
                <div className="rooms-row">
                    {organization.rooms.map((room, index) => {
                        if (index % 2 === 1) {
                            return (
                                <RoomModel
                                    room={room}
                                    bottomRoom
                                    first={index === 1}
                                />

                            )
                        } else return null
                    })}
                    {organization.rooms.length % 2 === 1 &&
                        <div className="room-block-empty"></div>
                    }
                </div>
            </div>
        </div>
    )
})

export default OfficeEditor