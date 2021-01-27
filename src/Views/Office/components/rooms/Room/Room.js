import { observer } from 'mobx-react'
import { rootstore } from '../../../../..';
import './Room.css';

const Room = observer((props) => {
    const userStore = rootstore.userStore
    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`} id={`room${props.room._id}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content" onClick={(event) => props.move(event, props.room._id, userStore.user._id)}>
            </div>
            <div className="room-bottom">
                <div className="room-door" id={`door${props.room._id}`}></div>
            </div>
        </div>
    )
})

export default Room;