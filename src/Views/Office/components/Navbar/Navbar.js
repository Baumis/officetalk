import './Navbar.css';
import { rootstore } from '../../../../index'


function Navbar(props) {
    const userStore = rootstore.userStore

    return (
        <div className="navbar block-shadow">
            <div className="navbar-logo">

            </div>
            <div className="navbar-user">
                {userStore.user.name}
            </div>
        </div>
    );
}

export default Navbar;