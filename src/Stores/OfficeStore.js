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
        name: 'Axel',
        room: 0
    },
    {
        name: 'Esko',
        room: 1
    },
    {
        name: 'Peter',
        room: 2
    }]

    messages = [{
        sender: 'Peter',
        content: 'Tää on tosi kiva toimisto.'
    },
    {
        name: 'Esko',
        content: 'Eihän tää oo ees valmis :D'
    },
    {
        name: 'Axel',
        content: 'Moi Esko.'
    }]

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default OfficeStore