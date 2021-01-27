import { makeAutoObservable } from 'mobx'
import Organization from '../Services/Organization'
import Message from '../Services/Message'

class OfficeStore {
    rootStore
    office
    organization

    users = [{
        id: 1,
        name: 'Axel Baumgartner',
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    },
    {
        id: 3,
        name: 'Peter Hilden',
        position: { room: -1, cordinates: { x: 5, y: 360 } },
        transitionTime: 2
    }]

    messages = [{
        author: 'Peter Hilden',
        content: 'Tää on tosi kiva toimisto.'
    },
    {
        author: 'Esko Kaurismäki',
        content: 'Eihän tää oo ees valmis :D'
    },
    {
        author: 'Axel Baumgartner',
        content: 'Moi Esko.'
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
            return response
        } else {
            return null
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