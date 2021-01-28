import { makeAutoObservable } from 'mobx'
import Organization from '../Services/Organization'
import Message from '../Services/Message'

class OfficeStore {
    rootStore
    office
    organization

    users = [{
        id: "600fddd784a2d221e466a3f9",
        name: 'Axel Baumgartner',
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    },
    {
        id: 3,
        name: "600fddd784a2d221e466a3f9",
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    }]

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    fetchOffice = async (id) => {
        const organization = await Organization.getOrganization(id)
        this.organization = organization
        this.office = organization.office
        console.log(this.organization)
        return this.office
    }

    sendMessage = async (content) => {
        const response = await Message.sendOfficeMessage({content: content})
        if (response) {
            let officeClone = JSON.parse(JSON.stringify(this.office))
            officeClone.messages.push(response)
            this.office = officeClone
            console.log(response)
            return response
        } else {
            return null
        }
    }

    receiveMessage = (message) => {
        let officeClone = JSON.parse(JSON.stringify(this.office))
        officeClone.messages.push(message)
        this.office = officeClone
    }

    changePosition = (id, position, transitionTime) => {
        console.log('store:', transitionTime)
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.id === id).position = position
        usersClone.find(user => user.id === id).transitionTime = transitionTime
        this.users = usersClone
    }
}

export default OfficeStore