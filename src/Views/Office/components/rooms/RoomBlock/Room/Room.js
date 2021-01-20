import './Room.css';

function Room(props) {

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'}`}>
            
        </div>
    );
}

export default Room;