import { rootstore } from '../index'

const delay = ms => new Promise(res => setTimeout(res, ms));

const move = async (X, Y, roomId, userId) => {
    const user = rootstore.officeStore.users.find(user => user.userId === userId)

    if (roomId !== user.position.room) {
        if (roomId === -1) {
            await roomToHall(user, X, Y, roomId, userId)
        } else if (user.position.room === -1) {
            await hallToRoom(user, X, Y, roomId, userId)
        } else {
            await roomToRoom(user, X, Y, roomId)
        }
    } else {
        await moveInsideRoom(userId, X, Y, roomId)
    }
}

const roomToHall = async (user, X, Y, roomId, userId) => {
    const duration = moveToDoor(userId, user.position.room)
    await delay(duration * 1000)
    moveInsideRoom(userId, X, Y, roomId)
}

const hallToRoom = async (user, X, Y, roomId) => {
    const duration = moveToDoor(user.userId, roomId)
    await delay(duration * 1000)
    moveInsideRoom(user.userId, X, Y, roomId)
}

const roomToRoom = async (user, X, Y, roomId) => {
    const duration = moveToDoor(user.userId, user.position.room)
    await delay(duration * 1000)
    const duration2 = moveToDoor(user.userId, roomId)
    await delay(duration2 * 1000)
    moveInsideRoom(user.userId, X, Y, roomId)
}

const moveInsideRoom = (userId, X, Y, roomId ) => {
    const user = rootstore.officeStore.users.find(user => user.userId === userId)
    const rooms = document.getElementById('rooms')
    const positionX = X 
    const positionY = Y 
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