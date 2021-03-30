import { makeObservable, observable, action, runInAction } from 'mobx'
import SignIn from '../Services/SignIn'
import Office from '../Services/Office'

class OrganizationStore {
    rootStore = null
    organization = null
    office = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            organization: observable,
            office: observable,
            signIn: action,
            setOrganization: action,
            signOut: action,
        })
    }

    signIn = async (username, password) => {
        const response = await SignIn.signInOrganization({ username, password })

        runInAction(() => {
            this.organization = response.user
            if (response.user.office) {
                this.office = response.user.office
            }
        })

        console.log('current organization:', this.organization)
        return response
    }

    setOrganization = (organization) => {
        runInAction(() => {
            this.organization = organization
            if (organization.office) {
                this.office = organization.office
            }
        })
    }

    signOut = async () => {
        await SignIn.SignOut()
        runInAction(() => {
            this.organization = null
        })
    }

    createOffice = async () => {
        const response = await Office.createOffice()
        runInAction(() => {
            this.office = response
        })
    }

}

export default OrganizationStore