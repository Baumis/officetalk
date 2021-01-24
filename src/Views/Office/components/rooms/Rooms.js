import './Rooms.css'
import { observer } from 'mobx-react';
import { rootstore } from '../../../../index'
import Room from './Room/Room'
import Hallway from './Hallway/Hallway'

const Rooms = observer(() => {
    const officeStore = rootstore.officeStore
    const roomsCount = officeStore.office.rooms.length
    
    return (
        <div className="rooms">
            <div className="rooms-row">
                {officeStore.office.rooms.map((room, index) => {
                    if (index % 2 === 0) {
                        return (
                            <Room
                                room={room}
                                first={index === 0}
                            />
                        )
                    }
                })}
            </div>
            <Hallway />
            <div className="rooms-row">
                {officeStore.office.rooms.map((room, index) => {
                    if (index % 2 === 1) {
                        return (
                            <Room
                                room={room}
                                bottomRoom
                                first={index === 1}
                            />

                        )
                    }
                })}
                {roomsCount % 2 === 1 &&
                    <div className="room-block-empty"></div>
                }
            </div>
        </div>
    )
})

export default Rooms