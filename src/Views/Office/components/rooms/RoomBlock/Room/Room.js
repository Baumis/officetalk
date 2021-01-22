import { observer } from 'mobx-react'
import './Room.css';
import { rootstore } from '../../../../../../index'

const Room = observer((props) => {
    const officeStore = rootstore.officeStore

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content">
            </div>
            <div className="room-bottom">
                <div className="room-door"></div>
            </div>
        </div>
    )
})

export default Room;