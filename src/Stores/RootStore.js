import { makeAutoObservable } from 'mobx'
import OfficeStore from "./OfficeStore"
import UserStore from "./UserStore"

class RootStore {
    officeStore
    userStore

    constructor() {
        this.officeStore = new OfficeStore(this)
        this.userStore = new UserStore(this)
        makeAutoObservable(this)
    }
}

export default RootStore
/*const storeInstance = new RootStore()
export default storeInstance;*/