import { makeObservable, observable, action, runInAction } from 'mobx'
import Employee from '../Services/Employee'
import SignIn from '../Services/SignIn'


class UserStore {
    rootStore = null
    user = null
    muted = false
    silenced = false

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            user: observable,
            muted: observable,
            silenced: observable,
            signIn: action,
            setUser: action,
            signOut: action,
            updateUser: action,
            setMuted: action,
            setSilenced: action
        })
    }

    signIn = async (username, password) => {
        const response = await SignIn.signInEmployee({ username, password })
        this.user = response.user
        console.log('current user:', this.user)
        return response
    }

    setUser = (user) => {
        runInAction(() => {
            this.user = user
        })
    }

    signOut = async () => {
        await SignIn.SignOut()
        this.rootStore.mediaStore.endAllConnections()
        runInAction(() => {
            this.user = null
        })
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

    setMuted = (value) => {
        this.muted = value
        if(value){
            this.rootStore.mediaStore.removeAudioStreams()
        } else {
            this.rootStore.mediaStore.addAudioStreams()
        }
    }

    setSilenced = (value) => {
        this.silenced = value
    }
}

export default UserStore;