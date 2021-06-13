import './Rooms.css'
import { observer, } from 'mobx-react'
import { rootstore } from '../../../../index'
import Room from './Room/Room'
import Hallway from './Hallway/Hallway'
import Avatar from '../Avatar/Avatar'
import Furniture from '../Furniture/Furniture'

const Rooms = observer(() => {
    const officeStore = rootstore.officeStore
    const roomsCount = officeStore.organization.rooms.length

    return (
        <div className="rooms" id="rooms">
            <div className="rooms-row">
                {officeStore.organization.rooms.map((room, index) => {
                    if (index % 2 === 0) {
                        return (
                            <Room
                                room={room}
                                first={index === 0}
                            />
                        )
                    } return null
                })}
            </div>
            <Hallway/>
            <div className="rooms-row">
                {officeStore.organization.rooms.map((room, index) => {
                    if (index % 2 === 1) {
                        return (
                            <Room
                                room={room}
                                bottomRoom
                                first={index === 1}
                            />

                        )
                    } else return null
                })}
                {roomsCount % 2 === 1 &&
                    <div className="room-block-empty"></div>
                }
            </div>
            <div className="furniture-layer">
                {officeStore.furnitures.map(furniture => <Furniture key={furniture.furnitureId} furniture={furniture} />)}
            </div>
            <div className="user-layer">
                {officeStore.users.map(user => <Avatar key={user.employeeId} user={user} />)}
            </div>
        </div>
    )
})

export default Rooms