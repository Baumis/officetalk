import { makeObservable, observable, action } from 'mobx'
import Employee from '../Services/Employee'
import SignIn from '../Services/SignIn'


class UserStore {
    rootStore = null
    user = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            user: observable,
            signIn: action,
            checkSignIn: action,
            signOut: action,
            updateUser: action
        })
    }

    signIn = async (username, password) => {
        const response = await SignIn.signInEmployee({ username, password })
        this.user = response.user
        console.log('current user:', this.user)
        return response
    }

    checkSignIn = async () => {
        const response = await SignIn.signInWithToken()
        this.user = response.user
        return response
    }

    signOut = async () => {
        await SignIn.SignOut()
        this.user = null
    }

    updateUser = async (userValues) => {
        try {
            const response = await Employee.updateEmployee(userValues)
            this.user = response
            return response
        } catch {
            return null
        }
    }
}

export default UserStore;