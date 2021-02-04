import { makeAutoObservable } from 'mobx'
import OfficeStore from "./OfficeStore"
import SocketStore from './SocketStore'
import UserStore from "./UserStore"

class RootStore {
    officeStore
    userStore
    socketStore

    constructor() {
        this.officeStore = new OfficeStore(this)
        this.userStore = new UserStore(this)
        this.socketStore = new SocketStore(this)
        makeAutoObservable(this)
    }
}

export default RootStore
/*const storeInstance = new RootStore()
export default storeInstance;*/