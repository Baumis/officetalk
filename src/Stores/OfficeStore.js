import { makeObservable, observable, action, runInAction } from 'mobx'
import Organization from '../Services/Organization'
import Message from '../Services/Message'

class OfficeStore {
    rootStore = null
    organization = null
    roomMessages = []

    users = []

    furnitures=[]
    /*furnitures = [
        {
            type: 'meeting-table',
            height: '150px',
            width: '85px',
            position: {x: 108, y: 85},
            direction: 'right'
        },
        {
            type: 'meeting-chair',
            height: '45px',
            width: '45px',
            position: {x: 198, y: 168},
            direction: 'right'
        },
        {
            type: 'meeting-chair',
            height: '45px',
            width: '45px',
            position: {x: 198, y: 103},
            direction: 'right'
        },
        {
            type: 'meeting-chair',
            height: '45px',
            width: '45px',
            position: {x: 58, y: 168},
            direction: 'right'
        },
        {
            type: 'meeting-chair',
            height: '45px',
            width: '45px',
            position: {x: 58, y: 103},
            direction: 'right'
        },
    ]*/

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            organization: observable,
            users: observable,
            roomMessages: observable,
            furnitures: observable,
            receiveMessage: action,
            changePosition: action,
            sendMessage: action,
            fetchOffice: action,
            setEmployeeStates: action,
            addEmployeeState: action,
            removeEmployeeState: action,
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

        console.log('current organization:', this.organization)
        return organization
    }
    
    setEmployeeStates = (employees) => {
        runInAction(() => {
            this.users = employees
        })
    }

    addEmployeeState = (employeeState) => {
        this.users = this.users.concat(employeeState)
    }

    removeEmployeeState = (employeeState) => {
        this.users = this.users.filter(user => user.employeeId !== employeeState.employeeId)
    }

    sendRoomMessage = (content) => {
        this.rootStore.socketStore.emitRoomMessage(content)
    }

    sendMessage = async (content) => {
        try {
            const response = await Message.sendOfficeMessage({ content: content })
            if (response) {
                if (!this.organization.messages.find(msg => msg._id === response._id)) {
                    let officeClone = JSON.parse(JSON.stringify(this.organization))
                    officeClone.messages.unshift(response)
                    runInAction(() => {
                        this.organization = officeClone
                    })
                }
                return response
            }
        } catch {
            return null
        }
    }

    receiveMessage = (message) => {
        if (!this.organization.messages.find(msg => msg._id === message._id)) {
            const officeClone = JSON.parse(JSON.stringify(this.organization))
            officeClone.messages.unshift(message)
            runInAction(() => {
                this.organization = officeClone
            })
        }
    }

    muteEmployee = (id, value) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.employeeId === id).muted = value
        runInAction(() => {
            this.users = usersClone
        })
    }

    silenceEmployee = (id, value) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.employeeId === id).silenced = value
        runInAction(() => {
            this.users = usersClone
        })
    }

    changePosition = (id, position, transitionTime) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.employeeId === id).position = position
        usersClone.find(user => user.employeeId === id).transitionTime = transitionTime
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