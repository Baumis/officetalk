import './RoomBlock.css'
import Room from './Room/Room'
import Hallway from './Hallway/Hallway'

function RoomBlock(props) {

    return (
        <div className={`room-block`} style={{ display: !props.display && 'none' }}>
            <Room
                first={props.first}
                last={props.last}
                room={props.roomTop}
                setPosition={props.setPosition}
                users={props.users}
            />
            <Hallway
                first={props.first}
                last={props.last}
                bottomBorder={!props.displayBoth}
                setPosition={props.setPosition}
                users={props.users}
                id={props.hallwayId}
            />
            { props.displayBoth ?
                <Room
                    first={props.first}
                    last={props.last}
                    room={props.roomBottom}
                    bottomRoom
                    setPosition={props.setPosition}
                    users={props.users}
                />
                :
                <div className="room-block-empty" style={{ height: props.minimal && '0px' }}></div>
            }
        </div>
    );
}

export default RoomBlock