import userEvent from '@testing-library/user-event';
import './Room.css';

function Room(props) {

    const roomGrid = () => {
        const grid = []
        for (let i = 0; i < 18; i++) {
            grid.push(
                <div className="room-square" roomId={i} onClick={() => props.setPosition({ name: 'A', room: props.room.id, position: i })}>
                    {props.users.find(user => user.room === props.room.id && user.position === i) &&
                        <div className="user-avatar"></div>
                    }
                </div>
            )
        }
        return grid
    }

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content">
                {roomGrid()}
            </div>
            <div className="room-bottom">
                <div className="room-door"></div>
            </div>
        </div>
    );
}

export default Room;