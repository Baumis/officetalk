import { observer } from 'mobx-react'
import './RoomModel.css'
import { FiEdit2, FiTrash } from 'react-icons/fi'

const RoomModel = observer((props) => {

    return (
        <div className={`room ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomRoom && 'bottom-room'}`} id={`room${props.room._id}`}>
            <div className="room-top">
                {props.room.name}
            </div>
            <div className="room-content">
                <div className="room-options">
                    <div className="room-option">
                        <FiEdit2 style={{"fontSize": "30px", "color": "#1CBF73"}}/>
                        Edit
                    </div>
                    <div className="room-option">
                        <FiTrash style={{"fontSize": "30px", "color": "#F74040"}}/>
                        Delete
                    </div>
                </div>
            </div>
            <div className="room-bottom">
                <div className="room-door" id={`door${props.room._id}`}></div>
            </div>
        </div>
    )
})

export default RoomModel