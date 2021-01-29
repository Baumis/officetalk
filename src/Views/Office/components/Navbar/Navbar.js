import './Navbar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'


const Navbar = observer((props) => {
    const userStore = rootstore.userStore
    const officeStore = rootstore.officeStore

    const signOut = () => {
        userStore.signOut()
        props.disconnectSocket()
        props.navigateTo('login')
    }

    return (
        <div className="navbar block-shadow">
            <div className="navbar-logo">
                <img className="navbar-logo-image" src="https://cdn.arstechnica.net/wp-content/uploads/2012/08/microsoft-metro-tall.png">

                </img>
                <div className="navbar-office-name">
                </div>
            </div>
            <div className="navbar-user">
                {userStore.user.name}
                <div className="navbar-user-avatar">
                </div>
                <div className="navbar-sign-out" onClick={() => signOut()}>
                    Sign out
                </div>
            </div>
        </div>
    )
})

export default Navbar;