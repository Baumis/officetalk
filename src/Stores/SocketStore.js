import { makeObservable, observable, action } from 'mobx'
import { io } from 'socket.io-client'
import { rootstore } from '..'
import move from '../Hooks/Mover'
import Socket from '../Services/Socket'

class SocketStore {
    rootStore = null
    socket = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            socket: observable,
            connectToOffice: action,
            disconnectSocket: action,
            emitPosition: action,
            emitMuted: action,
            emitSilenced: action
        })
    }

    connectToOffice = (token, organization) => {
        this.socket = io.connect(`/`, {
            auth: {
                token
            }
        })

        this.socket.on('message', (message) => {
            this.rootStore.officeStore.receiveMessage(message)
        })

        this.socket.on('employeeStates', (employeeStates) => {
            this.rootStore.officeStore.setEmployeeStates(employeeStates)
            this.rootStore.mediaStore.connectToPeers()
        })

        this.socket.on('addEmployeeState', (employeeState) => {
            this.rootStore.officeStore.addEmployeeState(employeeState)
        })

        this.socket.on('removeEmployeeState', (employeeState) => {
            this.rootStore.officeStore.removeEmployeeState(employeeState)
        })

        this.socket.on('updateEmployeeState', (employeeState) => {
            const targetUser = rootstore.officeStore.users.find(user => user.employeeId === employeeState.employeeId)
            if (targetUser.muted !== employeeState.muted) {
                rootstore.officeStore.muteEmployee(employeeState.employeeId, employeeState.muted)
            }
            if (targetUser.silenced !== employeeState.silenced) {
                rootstore.officeStore.silenceEmployee(employeeState.employeeId, employeeState.silenced)
            }
            if (targetUser.position !== employeeState.position) {
                move(
                    employeeState.position.coordinates.x,
                    employeeState.position.coordinates.y,
                    employeeState.position.room,
                    employeeState.employeeId
                )
            }
        })

        this.socket.on('roomMessage', (roomMessage) => {
            this.rootStore.officeStore.receiveRoomMessage(roomMessage)
        })
    }

    disconnectSocket = () => {
        this.socket.disconnect()
    }

    emitPosition = (position) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.employeeId === myId)))
        Socket.updateState({ ...state, position: position })
    }

    emitMuted = (muted) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.employeeId === myId)))
        Socket.updateState({ ...state, muted })
    }

    emitSilenced = (silenced) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.employeeId === myId)))
        Socket.updateState({ ...state, silenced })
    }

    emitRoomMessage = (content) => {
        Socket.addRoomMessage({ content })
    }

    emitStartCall = (data) => {
        Socket.startCall(data)
    }
}

export default SocketStore