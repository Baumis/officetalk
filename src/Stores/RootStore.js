import { makeAutoObservable } from 'mobx'
import OfficeStore from "./OfficeStore"
import UserStore from "./UserStore"

class RootStore {
    officeStore
    userStore
    text = "moi"

    constructor() {
        this.officeStore = new OfficeStore(this)
        this.userStore = new UserStore(this)
        makeAutoObservable(this)
    }
}

const storeInstance = new RootStore()
export default storeInstance;