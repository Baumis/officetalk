import { makeAutoObservable } from 'mobx'

class OfficeStore {
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
        name: 'Axel Baumgartner',
        room: 0
    },
    {
        name: 'Esko Kaurismäki',
        room: 1
    },
    {
        name: 'Peter Hilden',
        room: 2
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
}

export default OfficeStore