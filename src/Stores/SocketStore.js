import { makeObservable, observable, action } from 'mobx'
import { io } from 'socket.io-client'
import { rootstore } from '..'
import move from '../Hooks/Mover'

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
        this.socket = io.connect(`/${organization}`, {
            auth: {
                token
            }
        })

        this.socket.on('message', (message) => {
            this.rootStore.officeStore.receiveMessage(message)
        })

        this.socket.on('employees', (employees) => {
            this.rootStore.officeStore.setEmployeeStates(employees)
        })

        this.socket.on('employeeState', (employee) => {
            const targetUser = rootstore.officeStore.users.find(user => user.userId === employee.userId)
            if (targetUser.muted !== employee.muted) {
                rootstore.officeStore.muteEmployee(employee.userId, employee.muted)
            }
            if (targetUser.silenced !== employee.silenced) {
                rootstore.officeStore.silenceEmployee(employee.userId, employee.silenced)
            }
            if (targetUser.position !== employee.position) {
                move(
                    employee.position.coordinates.x,
                    employee.position.coordinates.y,
                    employee.position.room,
                    employee.userId
                )
            }
        })
    }

    disconnectSocket = () => {
        this.socket.disconnect()
    }

    emitPosition = (position) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.userId === myId)))
        this.socket.emit('employeeState', { employeeState: { ...state, position: position } })
    }

    emitMuted = (muted) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.userId === myId)))
        this.socket.emit('employeeState', { employeeState: { ...state, muted: muted } })
    }

    emitSilenced = (silenced) => {
        const myId = rootstore.userStore.user._id
        const state = JSON.parse(JSON.stringify(this.rootStore.officeStore.users.find(user => user.userId === myId)))
        this.socket.emit('employeeState', { employeeState: { ...state, silenced: silenced } })
    }
}

export default SocketStore