import { makeAutoObservable } from 'mobx'
import SignIn from '../Services/SignIn'
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

    signOut = async () => {
        await SignIn.SignOut()
        this.user = null
    }

}

export default UserStore;