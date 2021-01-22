import { makeAutoObservable } from 'mobx'

class UserStore {
    rootStore

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default UserStore;