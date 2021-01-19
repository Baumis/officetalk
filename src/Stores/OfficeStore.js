import { makeAutoObservable } from 'mobx'

class OfficeStore {
    socket = null

    constructor() {
        makeAutoObservable(this)
    }
}

const storeInstance = new OfficeStore()
export default storeInstance;