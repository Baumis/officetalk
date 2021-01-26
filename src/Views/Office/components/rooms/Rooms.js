import './Rooms.css'
import { observer } from 'mobx-react';
import { rootstore } from '../../../../index'
import Room from './Room/Room'
import Hallway from './Hallway/Hallway'
import Avatar from '../Avatar/Avatar'

const Rooms = observer(() => {
    const officeStore = rootstore.officeStore
    const roomsCount = officeStore.office.rooms.length

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const move = (event, roomId, userId) => {
        const rooms = document.getElementById('rooms')
        const user = officeStore.users.find(user => user.id === userId)

        if (roomId !== user.position.room) {
            if (roomId === -1) {
                roomToHall(user, rooms, event, roomId, userId)
            } else if (user.position.room === -1) {
                hallToRoom(user, rooms, event, roomId, userId)
            } else {
                roomToRoom(user, rooms, event, roomId, userId)
            }
        } else {
            moveInsideRoom(event, roomId, userId)
        }
    }

    const roomToHall = async (user, rooms, event, roomId, userId) => {
        moveToDoor(user, rooms, user.position.room)
        await delay(2000)
        moveInsideRoom(event, roomId, userId)
    }

    const hallToRoom = async (user, rooms, event, roomId, userId) => {
        moveToDoor(user, rooms, roomId)
        await delay(2000)
        moveInsideRoom(event, roomId, userId)
    }

    const roomToRoom = async (user, rooms, event, roomId, userId) => {
        moveToDoor(user, rooms, user.position.room)
        await delay(2000)
        moveToDoor(user, rooms, roomId)
        await delay(2000)
        moveInsideRoom(event, roomId, userId)
    }

    const moveInsideRoom = (event, roomId, userId) => {
        const rooms = document.getElementById('rooms')
        const positionX = event.clientX - rooms.offsetLeft
        const positionY = event.clientY - rooms.offsetTop
        officeStore.changePosition(userId, { room: roomId, cordinates: { x: positionX, y: positionY } })
    }

    const moveToDoor = (user, rooms, targetRoom) => {
        const doorElement = document.getElementById(`door${targetRoom}`)
        const doorX = doorElement.offsetLeft - rooms.offsetLeft + 30
        const doorY = doorElement.offsetTop - rooms.offsetTop
        officeStore.changePosition(user.id, { room: user.position.room, cordinates: { x: doorX, y: doorY } })
    }

    return (
        <div className="rooms" id="rooms">
            <div className="rooms-row">
                {officeStore.office.rooms.map((room, index) => {
                    if (index % 2 === 0) {
                        return (
                            <Room
                                room={room}
                                first={index === 0}
                                move={move}
                            />
                        )
                    } return null
                })}
            </div>
            <Hallway move={move} />
            <div className="rooms-row">
                {officeStore.office.rooms.map((room, index) => {
                    if (index % 2 === 1) {
                        return (
                            <Room
                                room={room}
                                bottomRoom
                                first={index === 1}
                                move={move}
                            />

                        )
                    } else return null
                })}
                {roomsCount % 2 === 1 &&
                    <div className="room-block-empty"></div>
                }
            </div>
            <div className="user-layer">
                {officeStore.users.map(user => <Avatar key={user.id} user={user} />)}
            </div>
        </div>
    )
})

export default Rooms