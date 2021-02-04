import { makeObservable, observable, action } from 'mobx'
import { io } from 'socket.io-client'

class SocketStore {
    rootStore = null
    socket = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            socket: observable,
            connectToOffice: action,
            disconnectSocket: action
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

    }

    disconnectSocket = () => {
        this.socket.disconnect()
    }
}

export default SocketStore