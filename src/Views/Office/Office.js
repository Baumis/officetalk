import './Office.css';
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'

function Office(props) {
    return (
        <div className="office">
            <Navbar />
            <div className="office-content">
                <Chat />
            </div>
        </div>
    );
}

export default Office;