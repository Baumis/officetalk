import './Hallway.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../..'

const Hallway = observer((props) => {
    const { socketStore } = rootstore

    const move = (event) => {
        const position = {
            room: -1,
            coordinates: {
                x: event.clientX,
                y: event.clientY
            }
        }
        socketStore.emitPosition(position)
    }
    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onDoubleClick={(e) => move(e)}>
        </div>
    );
})

export default Hallway