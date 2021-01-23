import { observer } from 'mobx-react'
import './Room.css';
import { rootstore } from '../../../../../../index'
import Avatar from '../../../Avatar/Avatar';

const Room = observer((props) => {
    const officeStore = rootstore.officeStore

    const moveToPosition = (event) => {
        const bounderies = event.target.getBoundingClientRect();
        const positionX = event.clientX - bounderies.left
        const positionY = event.clientY - bounderies.top
        officeStore.changePosition(1, { room: props.room.id, cordinates: { x: positionX, y: positionY } })
    }

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`} id={`room${props.room.id}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content" onClick={(event) => moveToPosition(event)}>
                {officeStore.users.map(user => user.position.room === props.room.id && <Avatar key={user.id} user={user} /> )}
            </div>
            <div className="room-bottom">
                <div className="room-door" id={`door${props.room.id}`}></div>
            </div>
        </div>
    )
})

export default Room;