import { makeAutoObservable } from 'mobx'

class UserStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default UserStore;