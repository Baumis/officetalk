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
        const user = officeStore.users.find(user => user.userId === userId)

        if (roomId !== user.position.room) {
            if (roomId === -1) {
                roomToHall(userId, rooms, event, roomId, user)
            } else if (user.position.room === -1) {
                hallToRoom(user, rooms, event, roomId, userId)
            } else {
                roomToRoom(rooms, event, roomId, user)
            }
        } else {
            moveInsideRoom(userId, event, roomId)
        }
    }

    const roomToHall = async (userId, rooms, event, roomId, user) => {
        const duration = moveToDoor(userId, rooms, user.position.room)
        await delay(duration * 1000)
        moveInsideRoom(userId, event, roomId)
    }

    const hallToRoom = async (user, rooms, event, roomId) => {
        const duration = moveToDoor(user.userId, rooms, roomId)
        await delay(duration * 1000)
        moveInsideRoom(user.userId, event, roomId)
    }

    const roomToRoom = async (rooms, event, roomId, user) => {
        const duration = moveToDoor(user.userId, rooms, user.position.room)
        await delay(duration * 1000)
        const duration2 = moveToDoor(user.userId, rooms, roomId)
        await delay(duration2 * 1000)
        moveInsideRoom(user.userId, event, roomId)
    }

    const moveInsideRoom = (userId, event, roomId) => {
        const user = officeStore.users.find(user => user.userId  === userId)
        const rooms = document.getElementById('rooms')
        const positionX = event.clientX - rooms.offsetLeft
        const positionY = event.clientY - rooms.offsetTop
        const transitionTime = calcTravelTime(user.position.coordinates.x, user.position.coordinates.y, positionX, positionY)
        officeStore.changePosition(userId, { room: roomId , coordinates: { x: positionX, y: positionY } }, transitionTime)
        return transitionTime
    }

    const moveToDoor = (userId, rooms, targetRoom) => {
        const user = officeStore.users.find(user => user.userId  === userId)
        const doorElement = document.getElementById(`door${targetRoom}`)

        //const doorX = doorElement.offsetLeft - rooms.offsetLeft + 30
        const doorX = doorElement.offsetLeft + 30
        //const doorY = doorElement.offsetTop - rooms.offsetTop
        const doorY = doorElement.offsetTop
        const transitionTime = calcTravelTime(user.position.coordinates.x, user.position.coordinates.y, doorX, doorY)
        officeStore.changePosition(userId, { room: user.position.room, coordinates: { x: doorX, y: doorY } }, transitionTime)
        return transitionTime
    }

    const calcTravelTime = (oldX, oldY, newX, newY) => {
        const travelX = Math.abs(oldX - newX)
        const travelY = Math.abs(oldY - newY)
        const TravelLength = Math.hypot(travelX,travelY)
        return TravelLength * 0.01
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
                {officeStore.users.map(user => <Avatar key={user._id} user={user} />)}
            </div>
        </div>
    )
})

export default Rooms