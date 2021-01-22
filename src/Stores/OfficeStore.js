import { makeAutoObservable } from 'mobx'

class OfficeStore {
    rootStore

    rooms = [{
        name: 'Kahvihuone'
    },
    {
        name: 'Laniluona'
    },
    {
        name: 'Työhuone'
    }]

    users = [{
        id: 1,
        name: 'Axel Baumgartner',
        position: { room: -1, position: 0 }
    },
    {
        id: 2,
        name: 'Esko Kaurismäki',
        position: { room: -1, position: 0 }
    },
    {
        id: 3,
        name: 'Peter Hilden',
        position: { room: -1, position: 0 }
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

    sendMessage = (content) => {
        this.messages.push({author: 'Axel Baumgartner', content: content})
    }

    changePosition = (id, position) => {
        let usersClone = JSON.parse(JSON.stringify(this.users))
        console.log(usersClone)
        usersClone.find(user => user.id === id).position = position
        this.users = usersClone
    }
}

export default OfficeStore