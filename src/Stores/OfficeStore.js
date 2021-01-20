import { makeAutoObservable } from 'mobx'

class OfficeStore {
    rooms = [{
        name: 'Kahvihuone'
    },
    {
        name: 'Laniluona'
    }]

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default OfficeStore