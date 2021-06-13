import './Navbar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'

const Navbar = observer((props) => {
    const { organizationStore } = rootstore

    const signOut = () => {
        organizationStore.signOut()
        props.navigateTo('login')
    }

    return (
        <div className="navbar block-shadow">
            <div className="navbar-logo">
                <img className="navbar-logo-image" src={organizationStore.organization.logo}>
                </img>
                <div className="navbar-office-name">
                    {organizationStore.organization.name}
                </div>
            </div>
            <div className="navbar-user">
                <div className="navbar-sign-out" onClick={() => signOut()}>
                    Sign out
                </div>
            </div>
        </div>
    )
})

export default Navbar