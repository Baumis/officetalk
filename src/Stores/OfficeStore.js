import { makeObservable, observable, action } from 'mobx'
import Organization from '../Services/Organization'
import Message from '../Services/Message'

class OfficeStore {
    rootStore = null
    office = null
    organization = null

    users = [{
        id: "600fddd784a2d221e466a3f9",
        name: 'Axel Baumgartner',
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    },
    {
        id: "600fdd8584a2d221e466a3f8",
        name: "600fddd784a2d221e466a3f9",
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    }]

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            office: observable,
            organization: observable,
            users: observable,
            receiveMessage: action,
            changePosition: action,
            sendMessage: action,
            fetchOffice: action
        })
    }

    fetchOffice = async (id) => {
        const organization = await Organization.getOrganization(id)
        this.organization = organization
        this.office = organization.office
        console.log('current organization:', this.organization)
        return organization
    }

    sendMessage = async (content) => {
        try {
            const response = await Message.sendOfficeMessage({ content: content })
            if (response) {
                if (!this.office.messages.find(msg => msg._id === response._id)) {
                    let officeClone = JSON.parse(JSON.stringify(this.office))
                    officeClone.messages.unshift(response)
                    this.office = officeClone
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
            this.office = officeClone
        }
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