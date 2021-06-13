import { makeObservable, observable, action, runInAction } from 'mobx'
import SignIn from '../Services/SignIn'
import Employee from '../Services/Employee'

class OrganizationStore {
    rootStore = null
    organization = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            organization: observable,
            signIn: action,
            setOrganization: action,
            signOut: action,
            createEmployee: action
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
        })
    }

    signOut = async () => {
        await SignIn.SignOut()
        runInAction(() => {
            this.organization = null
        })
    }

    createEmployee = async (employee) => {
        const response = await Employee.createEmployee(this.organization._id, employee)
        runInAction(() => {
            console.log('RESPONSE: ', response)
        })
    }

}

export default OrganizationStore