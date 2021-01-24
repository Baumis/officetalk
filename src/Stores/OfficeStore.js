import { makeAutoObservable } from 'mobx'
import Organization from '../Services/Organization'

class OfficeStore {
    rootStore
    office

    users = [{
        id: 1,
        name: 'Axel Baumgartner',
        position: { room: "600c4c29a4ff70357081e2c8", cordinates: { x: 10, y: 2 } }
    },
    {
        id: 3,
        name: 'Peter Hilden',
        position: { room: "600c4cb0a4ff70357081e2ca", cordinates: { x: 5, y: 20 } }
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
        this.office = organization.office
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