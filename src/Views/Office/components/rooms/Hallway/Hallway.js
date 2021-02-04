import './Hallway.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../..'

const Hallway = observer((props) => {
    const { socketStore } = rootstore

    const move = (event) => {
        const rooms = document.getElementById('rooms').getBoundingClientRect()
        const position = {
            room: -1,
            coordinates: {
                x: event.clientX - rooms.left,
                y: event.clientY - rooms.top
            }
        }
        console.log('clientX ', event.clientX, 'rooms left ', rooms.left)
        console.log('clientY ', event.clientY, 'rooms top ', rooms.top)
        socketStore.emitPosition(position)
    }
    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onDoubleClick={(e) => move(e)}>
        </div>
    );
})

export default Hallway