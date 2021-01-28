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
        const response = await signIn.signInEmployee({ username, password })
        this.user = response.user
        console.log(this.user)
        return response
    }

    checkSignIn = async () => {
        const response = await signIn.signInWithToken()
        this.user = response.user
        return response
    }

    signOut = async () => {
        await SignIn.SignOut()
        this.user = null
    }

}

export default UserStore;