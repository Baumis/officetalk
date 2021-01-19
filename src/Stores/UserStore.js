import { makeAutoObservable } from 'mobx'

class UserStore {
    socket = null

    constructor() {
        makeAutoObservable(this)
    }
}

const storeInstance = new UserStore()
export default storeInstance;