import { observer } from 'mobx-react'
import './Room.css';
import { rootstore } from '../../../../../../index'

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
                {officeStore.users.map(user => {
                    if (user.position.room === props.room.id) {
                        return (
                            <div className="user-avatar" key={user.id} style={{
                                top: user.position.cordinates.y,
                                left: user.position.cordinates.x
                            }}></div>
                        )
                    }
                })}
            </div>
            <div className="room-bottom">
                <div className="room-door"></div>
            </div>
        </div>
    )
})

export default Room;