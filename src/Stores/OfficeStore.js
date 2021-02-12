import { makeObservable, observable, action, runInAction } from 'mobx'
import Organization from '../Services/Organization'
import Message from '../Services/Message'

class OfficeStore {
    rootStore = null
    office = null
    organization = null
    roomMessages = []

    users = []

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            office: observable,
            organization: observable,
            users: observable,
            roomMessages: observable,
            receiveMessage: action,
            changePosition: action,
            sendMessage: action,
            fetchOffice: action,
            setEmployeeStates: action,
            receiveRoomMessage: action,
            sendRoomMessage: action,
            clearRoomChat: action
        })
    }

    fetchOffice = async (id) => {
        const organization = await Organization.getOrganization(id)

        runInAction(() => {
            this.organization = organization
        })

        runInAction(() => {
            this.office = organization.office
        })

        console.log('current organization:', this.organization)
        return organization
    }

    setEmployeeStates = (employees) => {
        runInAction(() => {
            this.users = employees
        })
    }

    sendRoomMessage = (content) => {
        this.rootStore.socketStore.emitRoomMessage(content)
    }

    sendMessage = async (content) => {
        try {
            const response = await Message.sendOfficeMessage({ content: content })
            if (response) {
                if (!this.office.messages.find(msg => msg._id === response._id)) {
                    let officeClone = JSON.parse(JSON.stringify(this.office))
                    officeClone.messages.unshift(response)
                    runInAction(() => {
                        this.office = officeClone
                    })
                }
                return response
            }
        } catch {
            return null
        }
    }

    receiveMessage = (message) => {
        if (!this.office.messages.find(msg => msg._id === message._id)) {
            const officeClone = JSON.parse(JSON.stringify(this.office))
            officeClone.messages.unshift(message)
            runInAction(() => {
                this.office = officeClone
            })
        }
    }

    muteEmployee = (id, value) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.userId === id).muted = value
        runInAction(() => {
            this.users = usersClone
        })
    }

    silenceEmployee = (id, value) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.userId === id).silenced = value
        runInAction(() => {
            this.users = usersClone
        })
    }

    changePosition = (id, position, transitionTime) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.userId === id).position = position
        usersClone.find(user => user.userId === id).transitionTime = transitionTime
        runInAction(() => {
            this.users = usersClone
        })
    }

    receiveRoomMessage = (message) => {
        if (!this.roomMessages.find(msg => msg._id === message._id)) {
            runInAction(() => {
                this.roomMessages = [message].concat(this.roomMessages)
            })
        }
    }

    clearRoomChat = () => {
        runInAction(() => {
            this.roomMessages = []
        })
    }
}

export default OfficeStore