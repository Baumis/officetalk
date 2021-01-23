import { makeAutoObservable } from 'mobx'
import signIn from '../Services/SignIn'

class UserStore {
    rootStore
    user

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    signIn = async (username, password) => {
        this.user = await signIn.signInEmployee({ username, password })
        return this.user
    }

    checkSignIn = async () => {
        this.user = await signIn.signInWithToken()
        return this.user
    }

}

export default UserStore;