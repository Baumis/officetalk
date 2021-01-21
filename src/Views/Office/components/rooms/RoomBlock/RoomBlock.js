import './RoomBlock.css'
import Room from './Room/Room'
import Hallway from './Hallway/Hallway'

function RoomBlock(props) {

    return (
        <div className={`room-block`} style={{ display: !props.display && 'none' }}>
            <Room
                first={props.first}
                last={props.last}
            />
            <Hallway
                first={props.first}
                last={props.last}
                bottomBorder={!props.displayBoth}
            />
            { props.displayBoth ?
                <Room
                    first={props.first}
                    last={props.last}
                />
                :
                <div className="room-block-empty" style={{height: props.minimal && '0px'}}></div>
            }
        </div>
    );
}

export default RoomBlock