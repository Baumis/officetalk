import { makeAutoObservable } from 'mobx'
import Organization from '../Services/Organization'

class OfficeStore {
    rootStore
    office
    organization

    users = [{
        id: 1,
        name: 'Axel Baumgartner',
        position: { room: -1, cordinates: { x: 5, y: 360 } }
    },
    {
        id: 3,
        name: 'Peter Hilden',
        position: { room: -1, cordinates: { x: 5, y: 360 } }
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

    sendMessage = (content) => {
        this.messages.push({ author: 'Axel Baumgartner', content: content })
    }

    changePosition = (id, position) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        usersClone.find(user => user.id === id).position = position
        this.users = usersClone
    }
}

export default OfficeStore