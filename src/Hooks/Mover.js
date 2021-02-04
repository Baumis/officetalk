import { rootstore } from '../index'

const delay = ms => new Promise(res => setTimeout(res, ms));

const move = async (event, roomId, userId) => {
    const user = rootstore.officeStore.users.find(user => user.userId === userId)

    if (roomId !== user.position.room) {
        if (roomId === -1) {
            await roomToHall(user, event, roomId, userId)
        } else if (user.position.room === -1) {
            await hallToRoom(user, event, roomId, userId)
        } else {
            await roomToRoom(user, event, roomId)
        }
    } else {
        await moveInsideRoom(userId, event, roomId)
    }
}

const roomToHall = async (user, event, roomId, userId) => {
    const duration = moveToDoor(userId, user.position.room)
    await delay(duration * 1000)
    moveInsideRoom(userId, event, roomId)
}

const hallToRoom = async (user, event, roomId) => {
    const duration = moveToDoor(user.userId, roomId)
    await delay(duration * 1000)
    moveInsideRoom(user.userId, event, roomId)
}

const roomToRoom = async (user, event, roomId) => {
    const duration = moveToDoor(user.userId, user.position.room)
    await delay(duration * 1000)
    const duration2 = moveToDoor(user.userId, roomId)
    await delay(duration2 * 1000)
    moveInsideRoom(user.userId, event, roomId)
}

const moveInsideRoom = (userId, event, roomId ) => {
    const user = rootstore.officeStore.users.find(user => user.userId === userId)
    console.log(userId, user, rootstore.officeStore.users)
    const rooms = document.getElementById('rooms')
    const positionX = event.clientX - rooms.offsetLeft
    const positionY = event.clientY - rooms.offsetTop
    const transitionTime = calcTravelTime(user.position.coordinates.x, user.position.coordinates.y, positionX, positionY)
    rootstore.officeStore.changePosition(userId, { room: roomId, coordinates: { x: positionX, y: positionY } }, transitionTime)
    return transitionTime
}

const moveToDoor = (userId, targetRoom) => {
    const user = rootstore.officeStore.users.find(user => user.userId === userId)
    const doorElement = document.getElementById(`door${targetRoom}`)

    const doorX = doorElement.offsetLeft + 30
    const doorY = doorElement.offsetTop
    const transitionTime = calcTravelTime(user.position.coordinates.x, user.position.coordinates.y, doorX, doorY)
    rootstore.officeStore.changePosition(userId, { room: user.position.room, coordinates: { x: doorX, y: doorY } }, transitionTime)
    return transitionTime
}

const calcTravelTime = (oldX, oldY, newX, newY) => {
    const travelX = Math.abs(oldX - newX)
    const travelY = Math.abs(oldY - newY)
    const TravelLength = Math.hypot(travelX, travelY)
    return TravelLength * 0.01
}

export default move