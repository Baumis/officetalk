import { makeAutoObservable } from 'mobx'
import OfficeStore from "./OfficeStore"
import SocketStore from './SocketStore'
import UserStore from "./UserStore"
import MediaStore from './MediaStore'
import OrganizationStore from './OrganizationStore'

class RootStore {
    officeStore
    userStore
    socketStore
    mediaStore
    organizationStore

    constructor() {
        this.officeStore = new OfficeStore(this)
        this.userStore = new UserStore(this)
        this.socketStore = new SocketStore(this)
        this.mediaStore = new MediaStore(this)
        this.organizationStore = new OrganizationStore(this)
        makeAutoObservable(this)
    }
}

export default RootStore