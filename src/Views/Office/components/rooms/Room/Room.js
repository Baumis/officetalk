import { observer } from 'mobx-react'
import { rootstore } from '../../../../..'
import './Room.css'

const Room = observer((props) => {
    const { socketStore } = rootstore

    const move = (event) => {
        const rooms = document.getElementById('rooms').getBoundingClientRect()
        const position = {
            room: props.room._id,
            coordinates: {
                x: event.clientX - rooms.left,
                y: event.clientY - rooms.top
            }
        }
        socketStore.emitPosition(position)
    }

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`} id={`room${props.room._id}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content" onDoubleClick={(event) => move(event)}>
            </div>
            <div className="room-bottom">
                <div className="room-door" id={`door${props.room._id}`}></div>
            </div>
        </div>
    )
})

export default Room;