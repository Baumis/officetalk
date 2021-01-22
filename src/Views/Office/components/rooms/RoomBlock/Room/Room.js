import { observer } from 'mobx-react'
import './Room.css';
import { rootstore } from '../../../../../../index'

const Room = observer((props) => {
    const officeStore = rootstore.officeStore

    const roomGrid = () => {
        const grid = []
        for (let i = 0; i < 18; i++) {
            grid.push(
                <div className="room-square" key={i} onClick={() => officeStore.changePosition(1, { room: props.room.id, position: i })}>
                    {officeStore.users.find(user => user.position.room === props.room.id && user.position.position === i) &&
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
    )
})

export default Room;