import './Office.css';
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'
import Rooms from './components/rooms/Rooms'

function Office(props) {
    return (
        <div className="office">
            <Navbar />
            <div className="office-body">
                <Chat />
                <Rooms />
            </div>
        </div>
    );
}

export default Office